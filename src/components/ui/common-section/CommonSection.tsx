import React from 'react'
import { Link } from 'react-router-dom'
import './common-section.scss'

interface CommonSectionState {
    title: string
}

const CommonSection = (props: CommonSectionState) => {
    return (
        <section className="common__section container">
            <Link to="/">
                <i className="ri-home-4-line icon-home"></i>
                {/* <HomeOutlined className="p-12 icon-home font-size-16px bg-white" /> */}
            </Link>
            <span className="r-arrow">{`>`}</span>
            <span className="pro-name">{props.title}</span>
        </section>
    )
}

export default CommonSection
