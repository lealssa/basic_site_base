export default () => ({
    nome: null,    
    tipo: null,    
    data: null,
    valor: null,
    despesas: Alpine.$persist([]),  
    temErros: false,
    init() {
        this.defineValoresPadrao()
    },
    get totalDespesas() {  
        let sum = this.despesas.reduce((accumulator, object) => {
            return accumulator + object.valor;
          }, 0)       
          
        return sum
    },    
    get totalPorTipo() {
        let result = [];

        this.despesas.reduce((res, value) => {
          if (!res[value.tipo]) {
            res[value.tipo] = { tipo: value.tipo, valor: 0 };
            result.push(res[value.tipo])
          }
          res[value.tipo].valor += value.valor;
          return res;
        }, {});

        return result
    },
    cadastraDespesa() {
        this.temErros = false

        let inputs = [...document.querySelectorAll("input[data-rules]")]             

        inputs.map((input) => {
            let helper = input.nextElementSibling

            let check = Iodine.assert(input.value, JSON.parse(input.dataset.rules))
            if (check.valid !== true) {
                input.classList.add('is-danger')
                helper.innerText = check.error
                helper.classList.remove('is-hidden')
                this.temErros = true
            }
            else {
                input.classList.remove('is-danger')    
                input.nextElementSibling.classList.add('is-hidden') 
            }           
        })

        if (this.temErros)
            return        

        this.despesas.push({
            id: Math.random().toString(16).slice(2), 
            nome: this.nome,
            tipo: this.tipo,
            data: this.data,
            valor: parseFloat(this.valor.replace(/\./g,'').replace(',','.')) || 0
        })      

        this.defineValoresPadrao()  

        console.log(this.totalPorTipo)
    },
    removeDespesa(id) {
        let filtered = this.despesas.filter( d => d.id == id )
        this.despesas.pop(filtered)    
    },
    defineValoresPadrao() {
        let today = new Date()
        
        this.nome = null,
        this.tipo = 'Diversos',
        this.data = today.toLocaleDateString('pt-Br'),
        this.valor = null       
    },
    listaErros() {
        let inputs = [...document.querySelectorAll("input[data-rules]")]    
        return inputs.filter((input) => Iodine.assert(input.value, JSON.parse(input.dataset.rules)).valid !== true)         
    }
})