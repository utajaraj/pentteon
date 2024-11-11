"use client"
import { getCats, CatInterface } from "../../lib/cats";
import { useEffect, useState } from "react";
import "./bg.css"

let catData: any = []
export default function Home() {

  const [items, setItems] = useState(catData.length === 0 ? Array.apply(null, Array(9)) : catData)

  // added artificial delay to test the UI skeleton loaders
  const setData = async (testUI: boolean = true) => {
    setItems(catData.concat(Array.apply(null, Array(9))))
    if (testUI) {
      await new Promise(res => setTimeout(res, 2000))
    }
    const data = await getCats()
    if (data) {
      catData = catData.concat(data)
      setItems(catData)
    }
  }


  useEffect(() => {
    if (catData.length === 0) {
      setData()
    }
    const onScroll = () => {
      const distanceToBottom: number = document.body.scrollHeight - window.innerHeight - window.scrollY;

      if (distanceToBottom < 30) {
        setData()
      }
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);



  return (
    <div className="line-bg flex flex-col gap-4 items-center">
      <div className="lg:w-[820px] md:w-[620px] sm:w-[220px] xs:w-[200px] flex flex-col gap-4 items-center p-8 bg-gray-100">
        {
          items.map((item: CatInterface, i: number) => {
            if (item == undefined) {
              return (
                <div key={`item-number-${i + 1}`} className="bg-white border shadow rounded-md p-4 w-full mx-auto">

                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="flex gap-2">
                        <div className="h-2 bg-gray-200 rounded w-[100px]"></div>
                        <div className="h-2 bg-gray-200 rounded w-[100px]"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="h-2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            return (
              <div className="rounded-md container flex flex-col gap-4 p-4 bg-white" key={`item-number-${i + 1}`}>
                <div className="flex gap-2">
                  <img className="rounded-full" src={item.picture} alt="alt text" />
                  <p>{item.name}</p>
                </div>
                <p>
                  {item.fact}
                </p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
