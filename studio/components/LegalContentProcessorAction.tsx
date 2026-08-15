import {useCallback, useMemo, useState} from 'react'
import {useDocumentOperation, useToast} from 'sanity'
import type {DocumentActionComponent} from 'sanity'
import {LegalContentProcessorDialog} from './LegalContentProcessorDialog'
import {normalizeLegalContent} from '../lib/legalContent/parser'
import type {LegalContentDocumentType, NormalizedLegalContent} from '../lib/legalContent/types'

type ContentDocument = Record<string, unknown>

function getStringValue(document: ContentDocument | null, fieldName: string): string {
  const value = document?.[fieldName]

  return typeof value === 'string' ? value.trim() : ''
}

function getPatchValues(
  documentType: LegalContentDocumentType,
  content: NormalizedLegalContent,
  currentTitle: string,
): Record<string, unknown> {
  const title = currentTitle || content.title

  if (documentType === 'legalArticle' && content.documentType === 'legalArticle') {
    return {
      ...(title ? {title} : {}),
      ...(content.body.length > 0 ? {body: content.body} : {}),
    }
  }

  if (content.documentType !== 'caseStudy') {
    return {}
  }

  return {
    ...(title ? {title} : {}),
    ...(content.sections.overview.length > 0 ? {overview: content.sections.overview} : {}),
    ...(content.sections.issues.length > 0 ? {legalIssues: content.sections.issues} : {}),
    ...(content.sections.response.length > 0 ? {response: content.sections.response} : {}),
    ...(content.sections.outcome.length > 0 ? {outcome: content.sections.outcome} : {}),
  }
}

export const LegalContentProcessorAction: DocumentActionComponent = (props) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const toast = useToast()
  const {patch} = useDocumentOperation(props.id, props.type)
  const document = (props.draft ?? props.published) as ContentDocument | null
  const rawSource = getStringValue(document, 'rawSource')
  const currentTitle = getStringValue(document, 'title')
  const documentType = props.type as LegalContentDocumentType
  const content = useMemo(
    () => normalizeLegalContent(documentType, rawSource),
    [documentType, rawSource],
  )

  const handleApply = useCallback(() => {
    const values = getPatchValues(documentType, content, currentTitle)

    if (Object.keys(values).length === 0) {
      toast.push({status: 'warning', title: '적용할 내용을 찾지 못했습니다.'})
      return
    }

    patch.execute([{set: values}])
    setDialogOpen(false)
    toast.push({status: 'success', title: '정리한 내용을 문서에 적용했습니다. 게시 전 다시 확인해 주세요.'})
  }, [content, currentTitle, documentType, patch, toast])

  return {
    label: '원문 자동 정리',
    title: '원문을 구조화하고 플랫폼별 복사본을 미리 봅니다.',
    disabled: !props.ready || !rawSource,
    onHandle: () => setDialogOpen(true),
    dialog: isDialogOpen
      ? {
          type: 'dialog',
          header: '원문 자동 정리',
          onClose: () => setDialogOpen(false),
          width: 'large',
          content: (
            <LegalContentProcessorDialog
              content={content}
              documentType={documentType}
              fallbackTitle={currentTitle}
              onApply={handleApply}
            />
          ),
        }
      : null,
  }
}
