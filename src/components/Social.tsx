import { FaGithub, FaLinkedin, FaYoutube, FaTwitter } from 'react-icons/fa'
import React from 'react'
import Link from 'next/link'
export interface SocialLink {
    type: string;
    url: string;
}

function getIcon(type: string) {
    switch (type) {
        case 'github':
            return <FaGithub />
        case 'linkedin':
            return <FaLinkedin />
        case 'youtube':
            return <FaYoutube />
        case 'twitter':
            return <FaTwitter />
    }
}

export default function Social({containerClass, iconClass, social_links}: {containerClass: string, iconClass: string, social_links: SocialLink[]}) {
    return (
        <div className={containerClass}>
            {social_links.map((social: SocialLink, index: number) => (
                <Link href={social.url} key={index} className={iconClass} target="_blank" rel="noopener noreferrer">
                    {getIcon(social.type)}
                </Link>
            ))}
        </div>
    )
}