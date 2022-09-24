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

  /* ### 목표 Start ### */
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
  /* ### 목표 End ### */

  const listItem = document.querySelectorAll(".challenge-item")
  const designItem = document.querySelectorAll(".challenge-design-item")
  
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

      const itemClassList = itemLabel.classList
      itemClassList.replace(itemClassList[1], designObj.design)
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

  designItem.forEach((element) => {
    const thisRadio = element.children[0]
    const thisLabel = element.children[1]

    const thisLabelClass = thisLabel.classList
    const labelClass = document.querySelector(".challenge-label").classList[1]
    if(thisLabelClass[1] === labelClass) {
      thisLabelClass.add("checked")
    }
   
    thisRadio.addEventListener("change", selectDesign)

    window.localStorage.getItem("design")
    
  })

  //클릭하면 클래스리스트 저장
  function selectDesign() {
    const thisLabel = this.nextElementSibling
    const thisFor = thisLabel.htmlFor
    const designObj = {
      "design": thisFor
    }
    listItem.forEach(element => {
      const itemClassList = element.children[1].classList
      itemClassList.replace(itemClassList[1], designObj.design)
    })
    window.localStorage.setItem("design", JSON.stringify(designObj))
  }

  $(".challenge-radio").click(function(){
    $(this).siblings().addClass("checked")
    $(this).parents(".challenge-design-item").siblings().find(".challenge-design-label").removeClass("checked")
  })

})

