import React from 'react'
import "../styles/Home.css"

function AboutUs() {
  return (
    <>
    
    <div className='contentBox'>
      <h3 className='bigText'>Hi! My Name is Mahir </h3> 
      <p>
        I am studying computer science at Monash University Australia and I have built this website as a fun side project.
        </p>
      <p>
My specialization for my degree is data science but I have always keen on web development as I found it to be much more rewarding when working on a project.
      </p>
      <p>

      
I am planning on building more projects to demonstrate my skills as well as improve my skills. If you would like to contact me, please do so via LinkedIn.
</p>

      
<div className="links"></div>
    </div>
    <br />
    <div className='contentBox'>
    <h3 className='bigText'>About This Project</h3>
    <p>This is a simple web application which utilises the cocktailDB API from New tab (cocktaildb.com)
    </p>
    <p>
It displays cocktails and users can comment on existing cocktails as well as add cocktails to the databse. The comments and the addition of new cocktails has been implemented myself.
    </p>
    </div>
    </>
  )
}

export default AboutUs