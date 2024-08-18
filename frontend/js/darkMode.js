(function(){

    const btnDark = document.querySelector('#btn-dark');
    const btnDarkPath = document.querySelector('#btn-dark path');
    const btnLight = document.querySelector('#btn-light');
    const btnLightPath = document.querySelector('#btn-light path');
    const tagHtml = document.querySelector('html');

    const nomeVariavel = localStorage.getItem('darkMode');
	const elementoJS = JSON.parse(nomeVariavel);
    if(elementoJS){
        const elementoJSON = JSON.stringify(true);
        localStorage.setItem('darkMode', elementoJSON);
        btnDark.classList.add('hidden');
        btnLight.classList.remove('hidden');
        tagHtml.classList.add('dark');
    } else{
        const elementoJSON = JSON.stringify(false);
        localStorage.setItem('darkMode', elementoJSON);
        btnDark.classList.remove('hidden');
        btnLight.classList.add('hidden');
        tagHtml.classList.remove('dark');
    }

    document.addEventListener('click', e => {
        const el = e.target;

        if(el == btnDark || el == btnDarkPath){
            const elementoJSON = JSON.stringify(true);
	        localStorage.setItem('darkMode', elementoJSON);

            btnDark.classList.add('hidden');
            btnLight.classList.remove('hidden');

            tagHtml.classList.add('dark');
        } else if(el == btnLight || el == btnLightPath){
            const elementoJSON = JSON.stringify(false);
	        localStorage.setItem('darkMode', elementoJSON);

            btnDark.classList.remove('hidden');
            btnLight.classList.add('hidden');

            tagHtml.classList.remove('dark');
        }
    });

})();