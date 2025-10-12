import { FaGithub, FaLinkedin, FaYoutube, FaTwitter } from 'react-icons/fa'
import React from 'react'
import Link from 'next/link'

const socials = [
    {
        icon: <FaGithub />,
        path: ''
    },
    {
        icon: <FaLinkedin />,
        path: ''
    },
    {
        icon: <FaYoutube />,
        path: ''
    },
    {
        icon: <FaTwitter />,
        path: ''
    }
]

export default function Social({containerClass, iconClass}: {containerClass: string, iconClass: string}) {
  return (
    <div className={containerClass}>
        {socials.map((social, index) => (
            <Link href={social.path} key={index} className={iconClass}>
                {social.icon}
            </Link>
        ))}
    </div>
  )
}
