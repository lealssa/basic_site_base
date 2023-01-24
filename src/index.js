import Alpine from 'alpinejs'
import mask from '@alpinejs/mask'
import persist from '@alpinejs/persist'
import Iodine from '@caneara/iodine';

const instance = new Iodine();

instance.setErrorMessages({
    required: "Campo obrigatório",
    dateString: "Data inválida",
    floatString: "Valor inválido"
});

instance.rule('dateString', (value) => {
    let dtPieces = value.split('/');
    if (dtPieces.length != 3)
        return false;

    // dd/mm/yyyy -> yyyy/mm/dd 
    let dt = new Date(dtPieces.reverse().join('/'));

    return !isNaN(dt);
});

instance.rule('floatString', (value) => {
    let floatStr = value.replace(/\./g,'').replace(',','.')
    
    if (isNaN(floatStr) || parseFloat(floatStr) <= 0)
        return false
        
    return true
});

window.Iodine = instance
window.Alpine = Alpine;

Alpine.plugin(mask)
Alpine.plugin(persist)

import despesas from './despesas.js'
import tiposDespesas from "./tiposDespesas";

Alpine.store('tiposDespesas', tiposDespesas);
Alpine.data('despesas', despesas);

Alpine.start();