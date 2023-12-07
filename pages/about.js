import Image from 'next/image'

function About() {
    return (
      <div>
        <h1>About Page</h1>
        <p>This is the About page content.</p>
       
        <div className="row">
            <div className="col">
                <p>Call the waiter</p>
                  {/* <img src="../assest/images/icon-waiter.svg" className="side-svgicon" /> */}
                  <Image src="http://rms.softreader.in:5000/item_images/1692355782027.jpg" alt="Landscape picture" width={500} height={300} />
            </div>
        </div> 
        
      </div>
    );
  }
  
  export default About;