const inputURL = document.querySelector('.form-control')
const submitBtn = document.querySelector('.btn')
const btnSVG = document.querySelector('.link-fill')
const clear = document.querySelector('.clear')
const hint = document.querySelector('.invalid-hint')
const copy = document.querySelector('.btn-copy')
const muted = document.querySelector('.btn-muted')
const link = document.querySelector('.shortenUrl')

const rule = /^(https?:\/\/)\S*\.(\S){2,}/

// 即時判斷按鈕狀態
inputURL.addEventListener('input', (event) => {
  // 使用者輸入時移除錯誤提示
  inputURL.classList.remove('is-invalid')
  hint.classList.remove('visible')

  let url = event.target.value
  // 顯示刪除按鈕，不去除空白
  switch (url.length) {
    case 0:
      //  隱藏刪除按鈕
      clear.classList.remove('visible')
      break;
    default:
      //  顯示刪除按鈕
      clear.classList.add('visible')
      break;
  }

  // 判斷連結按鈕
  if (rule.test(url)) {
    submitBtn.disabled = false
    btnSVG.classList.add('active')
  } else {
    submitBtn.disabled = true
    btnSVG.classList.remove('active')
  }
})

// 切換焦點時，才判斷錯誤提示
inputURL.addEventListener('change', (event) => {
  let url = event.target.value
  // 需有內容才顯示錯誤提示
  if (!rule.test(url) && url.trim().length) {
    inputURL.classList.add('is-invalid')
    hint.classList.add('visible')
  } else {
    inputURL.classList.remove('is-invalid')
    hint.classList.remove('visible')
  }
})

// 刪除按鈕功能
clear.addEventListener('click', () => {
  inputURL.value = ""
  clear.classList.remove('visible')
  // 移除錯誤提示
  inputURL.classList.remove('is-invalid')
  hint.classList.remove('visible')
})

// 複製按鈕功能
copy.addEventListener('click', () => {
  navigator.clipboard.writeText(link.innerText)
  copy.classList.add('disable')
  muted.classList.add('slide')
  // 自動恢復可點擊狀態
  setTimeout(() => {
    copy.classList.remove('disable')
    muted.classList.remove('slide')
  }, 2000)
})