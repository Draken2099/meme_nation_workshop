import React,{useState, useEffect} from 'react'

// react-bootstrap
import { Container,Row } from 'react-bootstrap'

import PostMeme from '../components/PostMeme'

// call api function
import { call_memes } from '../services/memes'

const Home = () => {
    const [memes, setMemes] = useState([])
    const [count, setCount] = useState(0)
    // let count = 0

    const handleScroll = (e) => {
        setCount(+10)
        const top = e.target.documentElement.scrollTop
        const height = e.target.documentElement.scrollHeight

        if(window.innerHeight + top + 1 >= height){
            loadData(count)
        }
    }

    useEffect(() => {
        loadData(10)
        window.addEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[count])

    const loadData = (count) => {
        call_memes(count).then((res) => {
            // console.log(res.data.memes)
            const newMemes = []
            res.data.memes.forEach((m) => newMemes.push(m))  
           
            setMemes(oldMemes => [...oldMemes, ...newMemes])
        }).catch((err) => {
            console.log(err.response)
        })
    }

    return (
        <Container className="my-4">
            <Row className="g-3">
                <PostMeme memes={memes} />
            </Row>
        </Container>
    );
}

export default Home