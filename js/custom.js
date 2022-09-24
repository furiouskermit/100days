$(function(){
  //checkbox list 100개 생성
  for(var i = 0; i < 100; i++) {
    $(".challenge-list").append(
      `<li class='challenge-item'>
        <input type='checkbox' name='challengeList' class='challenge-checkbox' id='challenge${i+1}'>
        <label class='challenge-label yeti' for='challenge${i+1}'></label>
      </li>`
    )
  }

  //목표
  const objectText = document.getElementById("chObj")
  function submitText() {
    event.preventDefault()
    const textVal = objectText.value;
    const textObj = {
      "text": textVal
    }
    window.localStorage.setItem("text", JSON.stringify(textObj))
  }

  document.getElementById("btnSubmit").addEventListener("click", submitText)


  window.localStorage.getItem("text")
  if(window.localStorage.getItem("text") !== null) {
    const textObj = JSON.parse(window.localStorage.getItem("text"))
    objectText.value = textObj.text
  }

  const listItem = document.querySelectorAll(".challenge-item")
  listItem.forEach((element) => {
    const itemChildren = element.children[0]
    const itemLabel = element.children[1]
    const checkboxId = itemChildren.getAttribute("id")

    window.localStorage.getItem("design")
    
    itemChildren.addEventListener("change", checkEvent)

    window.localStorage.getItem(checkboxId)

    if(window.localStorage.getItem(checkboxId) !== null) {
      const thisObj = JSON.parse(window.localStorage.getItem(checkboxId))
      itemChildren.checked = thisObj.itemProp
      itemLabel.classList = thisObj.itemClass
      
    }
    if(window.localStorage.getItem("design") !== null) {
      const designObj = JSON.parse(window.localStorage.getItem("design"))
      itemLabel.classList.add(designObj.design)
      if(designObj.design === 'yeti') {
        itemLabel.classList.remove('rockspirit')
      } else {
        itemLabel.classList.remove('yeti')
      }
    }
  })


  function checkEvent() {
    const itemId = this.getAttribute("id")
    const itemProp = this.checked
    if(itemProp) {
      this.nextElementSibling.classList.add("checked")
    } else {
      this.nextElementSibling.classList.remove("checked")
    }
    const itemClass = String(this.nextElementSibling.classList)
    const itemObj = {
      "itemId": itemId,
      "itemProp": itemProp,
      "itemClass": itemClass
    }
    window.localStorage.setItem(itemId, JSON.stringify(itemObj))
  }

  const designItem = document.querySelectorAll(".challenge-design-item")
  designItem.forEach((element) => {
    const thisRadio = element.children[0]
    const thisLabel = element.children[1]
  
    thisRadio.addEventListener("change", selectDesign)
  })

  //클릭하면 클래스리스트 저장
  function selectDesign() {
    const thisFor = this.nextElementSibling.htmlFor;
    const designObj = {
      "design": thisFor
    }
    listItem.forEach(element => {
      element.children[1].classList.add(thisFor)
      if(thisFor === 'yeti') {
        element.children[1].classList.remove('rockspirit pinkbean')
      } else if(thisFor === 'rockspirit') {
        element.children[1].classList.remove('yeti pinkbean')
      } else {
        element.children[1].classList.remove('yeti rockspirit')
      }
    })
    window.localStorage.setItem("design", JSON.stringify(designObj))
  }

})

