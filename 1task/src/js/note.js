let id=1;
window.addEventListener('DOMContentLoaded' , () => { 

	for(id;id<=7;id++){
		let table = document.querySelector('.table');
		let content0 = document.createElement('tr');
		const date =  new Date();

		content0.innerHTML = `
			<tr>
				<td class="table__text table__num" id="line-id-${id}">
					${id}
				</td>
				<td class="table__text table__date">
					${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}
				</td>
				<td class="table__text  table__comment" id="text-row-${id}">
					text-row-${id}
				</td>
				<td class="table__text  table__type" id="type-row-${id}">
					text-row-${id}
				</td>
				<td class="table__text  table__time">
					text-row-${id}
				</td>
				<td class="delete">
					<input type="button" value="Редакт"  id="re-row-${id}" class="btn btn-re" >
					<input type="button" value="Архив"  id="arh-row-${id}" class="btn btn-arh" >
					<input type="button" value="Удалить"  id="delete-row-${id}" class="btn btn-del" >
				</td> 
			</tr>
		`;
		document.querySelector('.table').appendChild(content0);
		content0.id= ('table_line-'+id);

		if(id<5){
			content0.className =  "idea line";
			content0.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent = 'idea'	;
		}
		else if(id<=7){
			content0.className =  "random line";
			content0.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent = 'random'
		}
		button(id);
	}

	

	document.getElementById('form-note').addEventListener('submit', (event) => {
		event.preventDefault();

		const form = document.getElementById('form-note');
		const date =  new Date();
		let error = formValidate(form);
		let data = document.querySelector('.form__content').value;		

		if(error === 0 ){
			let table = document.querySelector('.table');
			let content = document.createElement('tr');
			id++;
			content.innerHTML = `
				<tr>
					<td class="table__text table__num" id="line-id-${id}">
						${id}
					</td>
					<td class="table__text table__date">
						${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}
					</td>
					<td class="table__text  table__comment" id="text-row-${id}">
						${form.elements.comment.value} 
					</td>
					<td class="table__text  table__type" id="type-row-${id}">
						${form.elements.type.value}
					</td>
					<td class="table__text  table__time ">
						${form.elements.type.value}
					</td>
					<td class="delete">
						<input type="button" value="Редакт"  id="re-row-${id}" class="btn btn-re">
						<input type="button" value="Архив"  id="arh-row-${id}" class="btn btn-arh">
						<input type="button" value="Удалить"  id="delete-row-${id}" class="btn btn-del">
					</td> 
				</tr>
			`;
			document.querySelector('.table').appendChild(content);

			content.className = form.elements.type.value + " line";
			content.id= ('table_line-'+id);


			const formAdd = document.querySelector('.form-note')
			const a = document.querySelector('.form__content')
			a.value =``;
			formAdd.classList.toggle('__active');

		}

		
		else alert("заполни!");
	
		button(id);
		

	});

	function button (id){
		let delOneRow = document.getElementById("delete-row-"+id);
		let reOneRow = document.getElementById("re-row-"+id);
		let arhOneRow = document.getElementById("arh-row-"+id);

		if(delOneRow)delRow(id);
		if(reOneRow)reRow(id);
		if(arhOneRow)arhRow(id);

		summaryType();
	}


	function delRow(id){
		let delRow = document.getElementById('delete-row-'+id);
		let row = document.getElementById('table_line-'+id);
		
		delRow.addEventListener('click', (e) => {
			e.preventDefault();	
			row.remove();
			summaryType();
		})
	}

	function arhRow(id){

		let arhRow = document.getElementById('arh-row-'+id);
		let row = document.getElementById('table_line-'+id);

		arhRow.addEventListener('click', (e) => {
			e.preventDefault();
			
			let copyRow = row.cloneNode(true);
			let btnArch = copyRow.lastElementChild.firstElementChild.nextElementSibling;

			btnArch.defaultValue = 'Разархивировать';
			btnArch.className ="btn" +" "+ "btn-unarch";
			btnArch.id = 'unarh-row-'+id;

			copyRow.classList.toggle('archived')

			document.querySelector('.table-arh').appendChild(copyRow);

			row.remove();

			let unArhRow = document.getElementById("unarh-row-"+id);
			if (unArhRow) unArhOneRow(id);
			let delOneRow = document.getElementById("delete-row-"+id);
			let reOneRow = document.getElementById("re-row-"+id);

			if(delOneRow) delRow(id);
			if(reOneRow) reRow(id);

			summaryType();
		})
	}

	function unArhOneRow(id){
		
		let unarhRow = document.getElementById('unarh-row-'+id);
		let row = document.getElementById('table_line-'+id);

		unarhRow.addEventListener('click', (e) => {
			e.preventDefault();

			let copyRow = row.cloneNode(true);
			let btnArch = copyRow.lastElementChild.firstElementChild.nextElementSibling;

			btnArch.defaultValue = 'Архив';
			btnArch.className ="btn" +" "+ "btn-arh";
			btnArch.id = 'arh-row-'+id;

			copyRow.classList.toggle('archived');

			document.getElementById('table_line-'+id).remove();
			document.querySelector('.table').appendChild(copyRow);

			button(id);
			
		});
	}

	function reRow(id){
		
		let reRow=document.getElementById('re-row-'+id);

		reRow.addEventListener('click', (e) => {
			e.preventDefault();

			let textRow = document.getElementById('text-row-'+id);
			let data = textRow.innerText;
			let oldTable = document.querySelector('.renote');
			let reForm = document.createElement('form');

			reForm.innerHTML = `
				<textarea name="recomment" cols="40" rows="10" class="form__recontent  form__content _req _content"></textarea>
				<div class="retype">
					<div class="type-1">
						<input id="reform-radio-1" name="type" type="radio" value="task">
						<label for="reform-radio-1">Задача</label>
					</div>
					<div  class="type-2">
						<input id="reform-radio-2" name="type" type="radio" value="random">
						<label for="reform-radio-2">Случайная мысль</label>
					</div> 
					<div  class="type-3">
						<input id="reform-radio-3" name="type" type="radio" value="idea" checked>
						<label  for="reform-radio-3">Идея</label>
					</div>
				</div>	
				<div class="submit">
					<input type="submit" value="Отправить"  class="form__resubmit form__submit btn btn-re">
					<input type="button" value="выйти" class="reform__close  form__close btn btn-del"">
				</div>
			`;

			reForm.id='form-renote';
			reForm.classList = 'form-note-body'

			oldTable.appendChild(reForm);

			const form = document.getElementById('form-renote');
			let reTextarea = 	document.querySelector('.form__recontent');

			reTextarea.innerHTML = data;

			form.addEventListener('submit', (event) => {
				event.preventDefault();

				let reData =  reTextarea.value;
				let reType = form.elements.type.value;
				let current = document.getElementById('table_line-'+id).className = reType;

				document.getElementById('text-row-'+id).innerHTML = reData;
				document.getElementById('type-row-'+id).innerHTML = reType;
				
				reForm.remove();
			});

			document.querySelector('.reform__close').addEventListener('click', (event) => {
				event.preventDefault();
				reForm.remove();
			});

			summaryType();
		})	
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let i= 0; i < formReq.length; i++) {
			const input = formReq[i];
			formRemoveError(input); 
			if (input.classList.contains('_content')) {
				if (input.value === '' ) {
					formAddError(input);
					error++;
				}
		}

		return error;
		summaryType();
		}
	}

	function formRemoveError(input) {
		input.classList.remove('_error');
	}

	function formAddError(input) {
		// input.parentElement.classList.add('_error');
		input.classList.add('_error');
		console.log('helpMe');
	}

	function summaryType(){
		let value = document.querySelectorAll('.archived');
		let valueLenght = document.querySelectorAll('.archived').length
		let ideaTypeArh = document.querySelectorAll('.idea'+''+'.archived').length;			
		let randomTypeArh = document.querySelectorAll('.random'+''+'.archived').length;			
		let taskTypeArh = document.querySelectorAll('.task'+''+'.archived').length;		
		let taskType = (document.querySelectorAll('.task').length)-taskTypeArh;		
		let randomType = (document.querySelectorAll('.random').length)-randomTypeArh;
		let ideaType = (document.querySelectorAll('.idea').length)-ideaTypeArh;
			
		tableStat(randomTypeArh,randomType,ideaTypeArh,taskTypeArh,ideaType,taskType);
	}

	function tableStat(randomTypeArh,randomType,ideaTypeArh,taskTypeArh,ideaType,taskType){
		document.querySelector('.random-stat-active').textContent = randomType;
		document.querySelector('.random-stat-arh').textContent = randomTypeArh;
		document.querySelector('.idea-stat-active').textContent = ideaType;
		document.querySelector('.idea-stat-arh').textContent = ideaTypeArh;
		document.querySelector('.task-stat-active').textContent = taskType;
		document.querySelector('.task-stat-arh').textContent = taskTypeArh;
	}


});




