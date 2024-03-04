
import React, { useEffect, useRef } from "react"
import { useState } from "react"
import './Search.css'

function Search() {
  const [mydata, setmyData] = useState({});
  const inputref = useRef(null)

  const getWord = () => {
    
    try {
      
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputref.current.value}`)
        .then(response => {
          if (!response.ok) {
            alert("Sorry the Word is not Present ....😔")    
            throw new Error('Failed to fetch data');
          }
          return response.json()
        })
        .then(data => {
            setmyData(data[0])
        })
    } catch (error) {
      
      console.log(error)
    }


  }

  return (
    <>

      <div class="min-w-screen min-h-screen bg-gray-800 flex   px-5 py-5 ">
        <div class="w-full mx-auto rounded-xl bg-gray-100 shadow-lg p-10 text-gray-800 relative overflow-hidden resize-x min-w-80 max-w-3xl" >
          <div class="relative mt-1">
            <input ref={inputref} type="text" id="password" class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors" placeholder="Search word here..." />
            <button onClick={getWord} class="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors"><i class="mdi mdi-magnify"></i></button>
          </div>
          <div class="absolute top-0 left-0 w-full h-2 flex">
            <div class="h-2 bg-blue-500 flex-1"></div>
            <div class="h-2 bg-red-500 flex-1"></div>
            <div class="h-2 bg-yellow-500 flex-1"></div>
            <div class="h-2 bg-blue-500 flex-1"></div>
            <div class="h-2 bg-green-500 flex-1"></div>
            <div class="h-2 bg-red-500 flex-1"></div>
          </div>


          {/* Word */}

          <div class="bg-orange-400 relative mt-6 flex w-100 flex-col rounded-xl  bg-clip-border text-gray-700 shadow-md ">
            <div class="p-6 ">

              <h5 class="animate-bounce text-center mb-2 block bg-orange-400 text-black  text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased ">
                {mydata.word ? mydata.word.toUpperCase() : "Type word please....."}

              </h5>
              <p class="block  text-base font-semibold  leading-relaxed text-inherit antialiased">

              </p>
            </div>

          </div>

          {/* Meanings */}
          <div class=" relative mt-6 flex w-100 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md ">
            <div class="p-6 ">

              <h5 class="text-center mb-2 block text-blue-800  text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased underline ">
                Meaning


              </h5>
              <p class="selection:bg-blue-400 block  text-base font-semibold  leading-relaxed text-inherit antialiased">
                {mydata.meanings ? (mydata.meanings[0].definitions.map((element, index) => (
                  <span key={index} >
                    {index + 1}. {element.definition}<br />
                  </span>
                ))
                ) : "No meaning found"}
              </p>
            </div>

          </div>

          {/* Synonym */}
          <div class="relative mt-6 flex w-100 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="p-6">

              <h5 class="text-center  text-orange-600 mb-2 block text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased underline">
                Synonyms


              </h5>
              <p class="selection:bg-orange-200 block  font-semibold text-base  leading-relaxed text-inherit antialiased">
                {mydata.meanings ? (mydata.meanings[0].synonyms.map((element, index) => (
                  <span key={index}> {index + 1}. {element} <br /></span>
                ))
                ) : "No synonyms found"}
              </p>
            </div>

          </div>

          {/* Example */}
          <div class=" relative mt-6 flex w-100 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="p-6">

              <h5 class="text-center text-yellow-400 mb-2 block  text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased underline">
                Examples


              </h5>
              <p class="block  text-base font-semibold leading-relaxed text-inherit antialiased">
                {mydata.meanings ? (mydata.meanings[0].definitions.map((element, index) => (

                  <li>{element.example ? element.example : "Not Available"} <br /></li>

                )
                )) : "No example"}
              </p>
            </div>

          </div>




        </div>

      </div>


    </>
  )
}

export default Search
