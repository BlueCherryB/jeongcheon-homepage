import {useCallback} from 'react'
import {useToast} from 'sanity'
import {Box, Button, Card, Flex, Heading, Stack, Text} from '@sanity/ui'
import type {LegalContentDocumentType, LegalContentExport, NormalizedLegalContent} from '../lib/legalContent/types'
import {
  formatHomepageContent,
  formatLawTalkContent,
  formatNaverBlogContent,
} from '../lib/legalContent/formatters'

type LegalContentProcessorDialogProps = {
  content: NormalizedLegalContent
  documentType: LegalContentDocumentType
  fallbackTitle: string
  onApply: () => void
}

type CopyButtonProps = {
  label: string
  value: string
}

function CopyButton({label, value}: CopyButtonProps) {
  const toast = useToast()

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      toast.push({status: 'success', title: `${label}을(를) 복사했습니다.`})
    } catch {
      toast.push({status: 'error', title: '복사하지 못했습니다. 텍스트를 직접 선택해 복사해 주세요.'})
    }
  }, [label, toast, value])

  return <Button fontSize={1} mode="ghost" onClick={handleCopy} text={label} />
}

function ExportPreview({label, value}: {label: string; value: LegalContentExport}) {
  return (
    <Card border padding={3} radius={2}>
      <Stack space={3}>
        <Flex align="center" justify="space-between" gap={3} wrap="wrap">
          <Text size={1} weight="semibold">
            {label}
          </Text>
          <Flex gap={1} wrap="wrap">
            <CopyButton label="제목" value={value.title} />
            <CopyButton label="본문" value={value.body} />
            <CopyButton label="전체 내용" value={value.full} />
          </Flex>
        </Flex>
        <Text size={1} style={{whiteSpace: 'pre-wrap'}}>
          {value.full || '정리할 텍스트를 찾지 못했습니다.'}
        </Text>
      </Stack>
    </Card>
  )
}

function ContentPreview({content, fallbackTitle}: Pick<LegalContentProcessorDialogProps, 'content' | 'fallbackTitle'>) {
  const homepageContent = formatHomepageContent(content, fallbackTitle)

  return (
    <Card border padding={3} radius={2} tone="transparent">
      <Stack space={3}>
        <Text size={1} weight="semibold">
          Sanity에 적용될 내용
        </Text>
        <Text size={1} muted>
          제목: {homepageContent.title || '기존 제목을 유지합니다.'}
        </Text>
        <Text size={1} style={{whiteSpace: 'pre-wrap'}}>
          {homepageContent.body || '원문에서 적용할 본문을 찾지 못했습니다.'}
        </Text>
      </Stack>
    </Card>
  )
}

export function LegalContentProcessorDialog({
  content,
  documentType,
  fallbackTitle,
  onApply,
}: LegalContentProcessorDialogProps) {
  const homepageContent = formatHomepageContent(content, fallbackTitle)
  const naverContent = formatNaverBlogContent(content, fallbackTitle)
  const lawTalkContent = formatLawTalkContent(content, fallbackTitle)
  const documentLabel = documentType === 'caseStudy' ? '수행 사례' : '법률 정보'

  return (
    <Box padding={4} style={{maxHeight: '72vh', overflowY: 'auto'}}>
      <Stack space={5}>
        <Stack space={2}>
          <Heading size={2}>원문 자동 정리 미리보기</Heading>
          <Text size={1} muted>
            아래 결과를 확인한 뒤 적용을 눌러야 {documentLabel} 편집 필드가 채워집니다. 적용해도
            자동 게시되지는 않습니다.
          </Text>
        </Stack>

        <ContentPreview content={content} fallbackTitle={fallbackTitle} />

        <Stack space={3}>
          <Text size={1} weight="semibold">
            플랫폼별 복사본
          </Text>
          <ExportPreview label="홈페이지 / Sanity" value={homepageContent} />
          <ExportPreview label="네이버 블로그" value={naverContent} />
          <ExportPreview label="로톡" value={lawTalkContent} />
        </Stack>

        <Flex justify="flex-end">
          <Button onClick={onApply} text="검토한 내용 적용" tone="primary" />
        </Flex>
      </Stack>
    </Box>
  )
}
