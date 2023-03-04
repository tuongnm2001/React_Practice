import img from '../assets/about.png'
import './Home.scss'

const Home = () => {
    return (
        <div className="home-container">
            <div className="row d_flex">
                <div className="col-md-12 col-lg-5">
                    <div className="about_img">
                        <img src={img} alt="#" />
                    </div>
                </div>
                <div className="col-md-12 col-lg-7">
                    <div className="titlepage">
                        <h2> Welcome to <span style={{ color: '#fbca47' }}>TUONG NM</span></h2>
                        <p>
                            You never get a second chance to make a great first impression.
                            We just heard an awesome new person became a part of our team! Welcome to Tuong NM!
                        </p>
                        <button className="read_more" href="#"><span className='readmore'>HELLO GUYS !</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;