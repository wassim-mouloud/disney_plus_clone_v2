import React from 'react'

function Footer() {
  return (
    <div className='w-screen h-[200px] hidden lg:flex justify-center items-center mt-[70px] ' >
      <div className=' w-[90%] flex justify-between' >
        <div className='flex flex-col gap-4 ' >
          <p className='text-[#e1e6f0]' >Company</p>
          <div className='flex flex-col gap-1 text-[#8f98b2] text-[14px]' >
            <p>Supported Devices</p>
            <p>Internet Based Ads</p>
          </div>
        </div>

        <div className='flex flex-col gap-4 ' >
          <p className='text-[#e1e6f0]' >View website in</p>
          <div className='flex flex-col gap-1 text-[#8f98b2] text-[14px]' >
            <p>English</p>
            <p>Arabic</p>
          </div>
        </div>

        <div className='flex flex-col gap-4 ' >
          <p className='text-[#e1e6f0]' >Need help?</p>
          <div className='flex flex-col gap-1 text-[#8f98b2] text-[14px]' >
            <p>Help</p>
            <p>Feedback</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className='text-[#e1e6f0]' >Connect with Us</p>
          <div className='flex items-center justify-between ' >
            <a href="https://www.facebook.com/DisneyPlusMENA/?brand_redir=1233731130062594" target='_blank' ><img src="./images/facebook.png" alt="" className='w-5 h-5'  /></a>
            <a href="https://www.instagram.com/disneyplus/?hl=en" target='_blank' ><img src="./images/instagram.png" alt="" className='w-5 h-5'  /></a>
            <a href="https://twitter.com/DisneyPlus?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target='_blank' ><img src="./images/twitter.png" alt="" className='w-5 h-5'  /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer