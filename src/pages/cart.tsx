import { NextPage } from "next";
import Head from "next/head";

const Cart: NextPage = () => {
    return (
        <>
        <Head>
            <title>Carrinho</title>
            <meta name="description" content="Meu carrinho de Compras" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>
            Meu Carrinho
        </h1>
        </>
    )
}

export default Cart