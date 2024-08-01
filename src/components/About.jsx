import React from 'react'

export default function About(props) {
  return (
    
    <>

    <h1 className='my-3' style={{color:props.mode==='dark'?'white':'black'}}>About Us</h1>
    <div class="accordion" id="accordionExample">
    
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <strong>Why Us?</strong>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      TextUtils stands out due to its user-friendly interface, making it easy for anyone to use, regardless of technical expertise.
The tool is designed to be efficient and fast, providing quick results without any lag, ensuring you can work without interruptions.
We prioritize user feedback and continuously update the tool to add new features and improvements, ensuring it remains relevant and useful for all your text processing needs.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        <strong>Analyse Text</strong>
       
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      TextUtils provides a robust set of tools to analyze your text effectively. You can convert text to uppercase, lowercase, and more, making it easier to manipulate and understand your data.
The application supports various text transformations and checks, such as word count, character count, and sentence analysis.
It helps in ensuring your text meets specific requirements or standards by providing instant feedback and analysis.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
       <strong> Free to use</strong>

      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      TextUtils is completely free to use, making it accessible to everyone without any subscription or payment required.
You can use all the features without any limitations, ensuring you get the most out of the tool without any hidden costs.
Being a free tool, it is perfect for students, professionals, and anyone who needs to handle text manipulation without worrying about budget constriants
      </div>
    </div>
  </div>
</div>
    </>
  )
}
