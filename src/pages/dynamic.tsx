import { GetServerSideProps, NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

interface ApiResponse {
    name: string
    timeStamp: Date
}

export const getServerSideProps: GetServerSideProps = async () => {
    const serverSideData: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/hello`).then(res => res.json())

    return {
        props: {
            serverSideData
        }
    }
}

const Dynamic: NextPage = (props: {
    children?: ReactNode
    serverSideData?: ApiResponse
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
                <h1>Gerado no Servidor:</h1>
                <h2>{props.serverSideData?.timeStamp.toString()}</h2>
                </Col>

                <Col>
                <h1>Gerado no Cliente:</h1>
                <h2>{clientSideData?.timeStamp.toString()}</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default Dynamic
