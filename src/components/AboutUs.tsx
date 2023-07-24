import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import "../styles/Home.css"

function AboutUs() {

  const controls = useAnimation();
  const [ref1, inView1] = useInView({
    triggerOnce: true, 
  });
  
  const [ref2, inView2] = useInView({
    triggerOnce: true, 
  });

  useEffect(() => {
    if (inView1) {
      controls.start("visible");
    }
  }, [controls, inView1]);

  return (
    <>
    <motion.div className='contentBox'
  ref={ref1}
  animate={inView1 ? "visible" : "hidden"}
  initial="hidden"
  transition={{ duration: 2 }}
  variants={{
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }}
>
      <h3 className='bigText'>Hi! My Name is Mahir </h3> 
      <div className="paraContent">
      <p>
        I am studying computer science at Monash University Australia and I have built this website as a fun side project.
      </p>
      <p>
        My specialization for my degree is data science but I have always been keen on web development as I found it to be much more rewarding when working on a project.
      </p>
      <p>
        I am planning on building more projects to demonstrate my skills as well as improve my skills. If you would like to contact me, please do so via LinkedIn.
      </p>
      </div>
      <div className="links"></div>
    </motion.div>
    <br />
    <motion.div className='contentBox'
  ref={ref2}
  animate={inView2 ? "visible" : "hidden"}
  initial="hidden"
  transition={{ duration: 2 }}
  variants={{
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }}
>
      <h3 className='bigText'>About This Project</h3>
      <div className="paraContent">
        <p>This is a simple web application which utilises the cocktailDB API from New tab (cocktaildb.com)
        </p>
        <p>
          It displays cocktails and users can comment on existing cocktails as well as add cocktails to the databse. The comments and the addition of new cocktails has been implemented myself.
        </p>
      </div>
    </motion.div>
    </>
  )
}

export default AboutUs
