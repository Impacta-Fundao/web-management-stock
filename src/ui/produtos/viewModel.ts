export default function ProdutosViewModel() {
    const produtos:Array<string> = ["Produto 1", "Produto 2", "Produto 3"];

    const nomes:Array<{nomes:string}> = [
        {nomes: "Murillo"},
        {nomes: "Pedro"},
        {nomes: "Gustavo"}
    ];
    console.log(nomes)

    return { produtos, nomes };
}