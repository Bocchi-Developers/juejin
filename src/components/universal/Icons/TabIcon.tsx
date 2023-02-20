import style from './icon.module.less'

export const Expand = () => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      className={style.icon}
      height="60"
    >
      <path
        d="M498.752 288l224 224-224 224L544 781.248 813.248 512 544 242.752 498.752 288z m-288 0l224 224-224 224L256 781.248 525.248 512 256 242.752 210.752 288z"
        data-spm-anchor-id="a313x.7781069.0.i0"
      />
    </svg>
  )
}
export const Collapse = () => {
  return (
    <svg
      className={style.icon}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="60"
    >
      <path d="M525.248 288l-224 224 224 224L480 781.248 210.752 512 480 242.752 525.248 288z m288 0l-224 224 224 224L768 781.248 498.752 512 768 242.752 813.248 288z" />
    </svg>
  )
}
