import { Mermaid } from '~/components/universal/Mermaid'

import { HighLighter } from '../../CodeHighlighter'

export const CodeBlock = (props: {
  lang: string | undefined
  content: string
}) => {
  if (props.lang === 'mermaid') {
    return <Mermaid {...props} />
  } else {
    return <HighLighter {...props} />
  }
}
