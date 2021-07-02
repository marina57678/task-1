window.addEventListener('DOMContentLoaded' , () => {
	const btnOpenAddForm = document.querySelector('.form__open-add')
	const formAdd = document.querySelector('.form-note')
	const formClose= document.querySelector('.form__close');
	const archTableOpen = document.querySelector('.table__open-arh');
	const tableArch = document.querySelector('.table-arh-container');

	if (btnOpenAddForm) {
		btnOpenAddForm.addEventListener('click', () => {
			console.log('работает');
			formAdd.classList.toggle('__active');
		});
	}
	if(formClose){
		formClose.addEventListener('click', () => {
			formAdd.classList.toggle('__active');
		});
	}

	if(archTableOpen){
		
		archTableOpen.addEventListener('click', () => {
			tableArch.classList.toggle('table__active');

			if(archTableOpen.value==='Архив'){
				archTableOpen.value = 'Закрыть';
				archTableOpen.style.background='rgb(129, 108, 108)';
			}
			else if(archTableOpen.value==='Закрыть'){
				archTableOpen.value="Архив";
				archTableOpen.style.background='rgb(52, 82, 80)';
			}
		});
	}

});