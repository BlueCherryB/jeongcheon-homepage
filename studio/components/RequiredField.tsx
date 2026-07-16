import type {FieldProps} from 'sanity'

export function RequiredField(props: FieldProps) {
  const title = props.title ? (
    <>
      {props.title}
      <span style={{color: '#D14343'}}> *</span>
    </>
  ) : (
    props.title
  )

  return props.renderDefault({
    ...props,
    title: title as unknown as string,
  })
}
