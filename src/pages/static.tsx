import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

interface ApiResponse {
    name: string
    timeStamp: Date
}

export const getStaticProps: GetStaticProps = async () => {
    const staticData = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/hello`).then(res => res.json())

    return {
        props: {
            staticData
        },
        revalidate: 10
    }
}

const Static: NextPage = (props: {
    children?: ReactNode
    staticData?: ApiResponse
}) => {
    const [clientSideData, setClientSideData] = useState<ApiResponse>()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await fetch('/api/hello')
        const data = await response.json()
        setClientSideData(data)
    }
    return (
        <Container tag='main'>
            <h1 className="my-5">
                Como funcionam as renderizações do NEXT.JS
            </h1>

            <Row>
                <Col>
                <h1>Gerado estaticamente durante o build:</h1>
                <h2>{props.staticData?.timeStamp.toString()}</h2>
                </Col>

                <Col>
                <h1>Gerado no Cliente:</h1>
                <h2>{clientSideData?.timeStamp.toString()}</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default Static
