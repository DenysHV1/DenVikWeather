const geolocationError = (error) => {
	if (error.code === 1) {
	  alert(
		"Вы отклонили запрос геолокации. Пожалуйста, разрешите доступ в настройках браузера."
	  );
	} else if (error.code === 2) {
	  alert(
		"Невозможно определить местоположение. Проверьте соединение с интернетом."
	  );
	} else if (error.code === 3) {
	  alert("Тайм-аут. Попробуйте снова.");
	} else {
	  alert("Произошла ошибка: " + error.message);
	}
  }

  export default geolocationError;