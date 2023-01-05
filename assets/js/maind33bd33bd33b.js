$(document).ready(function () {
  const goToByScroll = function (id) {
    id = id.replace("link", "")
    $("html,body").animate({
      scrollTop: $("#" + id).offset().top
    }, "slow")
  }

  $("#discover-button").click(function () {
    goToByScroll("shop-section")
  })

  let sortButtonActive = false
  let sortButtonInput = "#sort-input-alphabetic"

  const filterProductsBySearchAndSold = function() {
    const searchQuery = $("#search-query").val().toLowerCase()
    const showSold = $("#show-sold").is(":checked")

    const productWrapper = $(".products .productWrapper")
    productWrapper.children().hide()

    const productContainer = productWrapper
      .children()
      .find(`.usernameProduct[data-name${searchQuery ? `*="${searchQuery}"` : ""}][data-sold${showSold ? "" : "=0"}]`)
      .parent()

    productContainer.show()
  }

  const hideSortButton = function () {
    sortButtonActive = false
    $("#sort-button-balloon").hide()
  }

  const toggleSortButton = function () {
    sortButtonActive = !sortButtonActive

    if (sortButtonActive) setTimeout(() => document.addEventListener("click", hideSortButton), 0)
    else document.removeEventListener("click", hideSortButton)
  }

  const showSoldProducts = function () {
    const productWrapper = $(".products .productWrapper")
    const productContainer = productWrapper.children().find(".usernameProduct[data-sold=1]").parent()

    productContainer.show()
  }

  const hideSoldProducts = function () {
    const productWrapper = $(".products .productWrapper")
    const productContainer = productWrapper.children().find(".usernameProduct[data-sold=1]").parent()

    productContainer.hide()
  }

  const sortProductsbyPrice = function () {
    $(sortButtonInput).toggleClass("isActive")

    sortButtonInput = "#sort-input-price"

    $("#sort-button-text").text("Price")
    $("#sort-input-price").toggleClass("isActive")

    const productWrapper = $(".products .productWrapper")
    const productContainer = productWrapper.children()

    productContainer.sort(function (a, b) {
      const keyA = $(a).find(".usernameProduct").attr("data-price")
      const keyB = $(b).find(".usernameProduct").attr("data-price")

      return keyB - keyA
    })

    productWrapper.append(productContainer)
  }

  const sortProductsByAlphabetic = function () {
    $(sortButtonInput).toggleClass("isActive")

    sortButtonInput = "#sort-input-alphabetic"

    $("#sort-button-text").text("Alphabetical order")
    $("#sort-input-alphabetic").toggleClass("isActive")

    const productWrapper = $(".products .productWrapper")
    const productContainer = productWrapper.children()

    productContainer.sort(function (a, b) {
      const keyA = $(a).find(".usernameProduct").attr("data-name")
      const keyB = $(b).find(".usernameProduct").attr("data-name")

      return keyA.localeCompare(keyB)
    })

    productWrapper.append(productContainer)
  }

  const sortProductsbyLength = function () {
    $(sortButtonInput).toggleClass("isActive")

    sortButtonInput = "#sort-input-length"

    $("#sort-button-text").text("Length")
    $("#sort-input-length").toggleClass("isActive")

    const productWrapper = $(".products .productWrapper")
    const productContainer = productWrapper.children()

    productContainer.sort(function (a, b) {
      const keyA = $(a).find(".usernameProduct").attr("data-name")
      const keyB = $(b).find(".usernameProduct").attr("data-name")

      return keyA.length - keyB.length
    })

    productWrapper.append(productContainer)
  }

  const sortProductsByRecent = function () {
    $(sortButtonInput).toggleClass("isActive")

    sortButtonInput = "#sort-input-recent"

    $("#sort-button-text").text("Recently added")
    $("#sort-input-recent").toggleClass("isActive")

    const productWrapper = $(".products .productWrapper")
    const productContainer = productWrapper.children()

    productContainer.sort(function (a, b) {
      const keyA = $(a).find(".usernameProduct").attr("data-id")
      const keyB = $(b).find(".usernameProduct").attr("data-id")

      return keyB - keyA
    })

    productWrapper.append(productContainer)
  }

  $("#search-query").keyup(function () {
    filterProductsBySearchAndSold()
  })

  $("#show-sold").change(function() {
    // if (this.checked) showSoldProducts()
    // else hideSoldProducts()

    filterProductsBySearchAndSold()
  })

  $("#sort-button").click(function (event) {
    toggleSortButton()

    $("#sort-button-balloon").toggle()

    event.stopPropagation()
  })

  $("#sort-input-price").click(function (event) {
    sortProductsbyPrice()

    event.stopPropagation()
  })

  $("#sort-input-alphabetic").click(function (event) {
    sortProductsByAlphabetic()

    event.stopPropagation()
  })

  $("#sort-input-length").click(function (event) {
    sortProductsByAlphabetic()
    sortProductsbyLength()

    event.stopPropagation()
  })

  $("#sort-input-recent").click(function (event) {
    sortProductsByRecent()

    event.stopPropagation()
  })

  $("#sort-input-co").click(function (event) {
    $(sortButtonInput).toggleClass("isActive")

    sortButtonInput = "#sort-input-co"

    $("#sort-button-text").text("C/O")
    $(this).toggleClass("isActive")

    event.stopPropagation()
  })

  $("#swap-service-input").change(function() {
    const defaultTotalAmount = parseFloat($("#checkout-total-amount").attr("data-price"))

    if (this.checked) {
      $("#swap-service-charge").show()
      const newTotalAmount = (defaultTotalAmount * 1.10).toFixed(2)
      $("#swap-service-charge-amount").text((defaultTotalAmount * 1.10 - defaultTotalAmount).toFixed(2))
      $("#checkout-total-amount").text(newTotalAmount)
    } else {
      $("#swap-service-charge").hide()
      $("#checkout-total-amount").text(defaultTotalAmount.toFixed(2))
    }
  })

  const openCheckoutModal = function (name, price) {
    const displayPrice = parseFloat(price).toFixed(2)

    $("#checkout-modal").fadeIn({duration: 200})
    $("#checkout-username-letter").text(name.charAt(0).toUpperCase())
    $("#checkout-username-link").attr("href", "https://t.me/" + name)
    $("#checkout-username").text(name)
    $("#username-charge-amount").text(displayPrice)
    $("#checkout-total-amount").attr("data-price", price).text(displayPrice)
    $("html").addClass("blockScroll")
  }

  const closeCheckoutModal = function () {
    $("#checkout-modal").fadeOut({duration: 200})
    $("#swap-service-input").prop("checked", false)
    $("#swap-service-charge").hide()
    $("html").removeClass("blockScroll")
  }

  $("[open-checkout-modal]").click(function () {
    openCheckoutModal($(this).attr("data-name"), $(this).attr("data-price"))
  })

  $("[close-checkout-modal]").click(function () {
    closeCheckoutModal()
  })

  $("#checkout-modal").click(function (event) {
    if ($(event.target).is("#checkout-modal")) closeCheckoutModal()
  })

  $("#purchase-button").click(function () {
    const swap = $("#swap-service-input").is(":checked")

    if (swap || confirm("Do you really want to continue without including a swap to your account?")) {
      $.post("./api/purchase", {
        username: $("#checkout-username").text(),
        swap: swap ? "1" : "0",
        telegram: $("#checkout-telegram-input").val()
      }, function (data) {
        window.location.href = data.redirect
      })
    }
  })


    const openCheckoutModal1 = function (name, price) {
    const displayPrice = parseFloat(price).toFixed(2)

    $("#checkout-modal1").fadeIn({duration: 200})
    $("#checkout-username-letter").text(name.charAt(0).toUpperCase())
    $("#checkout-username-link").attr("href", "https://t.me/" + name)
    $("#checkout-username").text(name)
    $("#username-charge-amount").text(displayPrice)
    $("#checkout-total-amount").attr("data-price", price).text(displayPrice)
    $("html").addClass("blockScroll")
  }

  const closeCheckoutModal1 = function () {
    $("#checkout-modal1").fadeOut({duration: 200})
    $("#swap-service-input").prop("checked", false)
    $("#swap-service-charge").hide()
    $("html").removeClass("blockScroll")
  }

  $("[open-checkout-modal1]").click(function () {
    openCheckoutModal1($(this).attr("data-name"), $(this).attr("data-price"))
  })

  $("[close-checkout-modal1]").click(function () {
    closeCheckoutModal1()
  })

  $("#checkout-modal1").click(function (event) {
    if ($(event.target).is("#checkout-modal1")) closeCheckoutModal1()
  })

  $("#purchase-button").click(function () {
    const swap = $("#swap-service-input").is(":checked")

    if (swap || coS("Do you really want to continue without including a swap to your account?")) {
      $.post("./api/purchase", {
        username: $("#checkout-username").text(),
        swap: swap ? "1" : "0",
        telegram: $("#checkout-telegram-input").val()
      }, function (data) {
        window.location.href = data.redirect
      })
    }
  })

   const openCheckoutModal2 = function (name, price) {
    const displayPrice = parseFloat(price).toFixed(2)

    $("#checkout-modal2").fadeIn({duration: 200})
    $("#checkout-username-letter").text(name.charAt(0).toUpperCase())
    $("#checkout-username-link").attr("href", "https://t.me/" + name)
    $("#checkout-username").text(name)
    $("#username-charge-amount").text(displayPrice)
    $("#checkout-total-amount").attr("data-price", price).text(displayPrice)
    $("html").addClass("blockScroll")
  }

  const closeCheckoutModal2 = function () {
    $("#checkout-modal2").fadeOut({duration: 200})
    $("#swap-service-input").prop("checked", false)
    $("#swap-service-charge").hide()
    $("html").removeClass("blockScroll")
  }

  $("[open-checkout-modal2]").click(function () {
    openCheckoutModal2($(this).attr("data-name"), $(this).attr("data-price"))
  })

  $("[close-checkout-modal2]").click(function () {
    closeCheckoutModal2()
  })

  $("#checkout-modal2").click(function (event) {
    if ($(event.target).is("#checkout-modal2")) closeCheckoutModal2()
  })

  $("#purchase-button").click(function () {
    const swap = $("#swap-service-input").is(":checked")

    if (swap || coS("Do you really want to continue without including a swap to your account?")) {
      $.post("./api/purchase", {
        username: $("#checkout-username").text(),
        swap: swap ? "1" : "0",
        telegram: $("#checkout-telegram-input").val()
      }, function (data) {
        window.location.href = data.redirect
      })
    }
  })

    const openCheckoutmodal3 = function (name, price) {
    const displayPrice = parseFloat(price).toFixed(2)

    $("#checkout-modal3").fadeIn({duration: 200})
    $("#checkout-username-letter").text(name.charAt(0).toUpperCase())
    $("#checkout-username-link").attr("href", "https://t.me/" + name)
    $("#checkout-username").text(name)
    $("#username-charge-amount").text(displayPrice)
    $("#checkout-total-amount").attr("data-price", price).text(displayPrice)
    $("html").addClass("blockScroll")
  }

  const closeCheckoutmodal3 = function () {
    $("#checkout-modal3").fadeOut({duration: 200})
    $("#swap-service-input").prop("checked", false)
    $("#swap-service-charge").hide()
    $("html").removeClass("blockScroll")
  }

  $("[open-checkout-modal3]").click(function () {
    openCheckoutmodal3($(this).attr("data-name"), $(this).attr("data-price"))
  })

  $("[close-checkout-modal3]").click(function () {
    closeCheckoutmodal3()
  })

  $("#checkout-modal3").click(function (event) {
    if ($(event.target).is("#checkout-modal3")) closeCheckoutmodal3()
  })

  $("#purchase-button").click(function () {
    const swap = $("#swap-service-input").is(":checked")

    if (swap || coS("Do you really want to continue without including a swap to your account?")) {
      $.post("./api/purchase", {
        username: $("#checkout-username").text(),
        swap: swap ? "1" : "0",
        telegram: $("#checkout-telegram-input").val()
      }, function (data) {
        window.location.href = data.redirect
      })
    }
  })

  hideSoldProducts()
  sortProductsbyPrice()
  $("#swap-service-charge").hide()
  
  $("#loadingPage").fadeOut({
    duration: 300,
    complete: function () {
      $("html").toggleClass("blockScroll")
    }
  })
})