// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {
    // Show loading icon
    showLoading("#main-content");
    
    // Retrieve all categories and build the home page
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowHomeHTML,  // STEP 1: Обработчик
      true // Get JSON data
    );
  });
  
  // Builds the home page HTML based on categories array
  function buildAndShowHomeHTML(categories) {
    // Load home snippet page
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtml) {
        // STEP 2: Выбираем случайную категорию
        var chosenCategory = chooseRandomCategory(categories);
        var chosenCategoryShortName = chosenCategory.short_name;
  
        // STEP 3: Заменяем плейсхолдер {{randomCategoryShortName}} на выбранную категорию
        var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, "randomCategoryShortName", chosenCategoryShortName);
  
        // STEP 4: Вставляем HTML на страницу
        insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
  
        // Загружаем меню для выбранной категории
        $dc.loadMenuItems(chosenCategoryShortName);
      },
      false // Получаем обычный HTML, не JSON
    );
  }
  
  // Choose a random category from the array
  function chooseRandomCategory(categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }
  