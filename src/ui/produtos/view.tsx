
type Props = {
    produtos: Array<string>
    nomes: Array<{ nomes: string }>
}

export default function ProdutosView({ produtos, nomes }: Props) {
    return (
        <>
            <ul>
                {produtos.map((pr, i) => (<li key={i}>{pr}</li>))}</ul>

            <ul>
                {nomes.map((nm) => (<li key={nm.nomes}>{nm.nomes}</li>))}
            </ul>
        </>

    )
}