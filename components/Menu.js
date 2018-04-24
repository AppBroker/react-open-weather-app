import React, { Component } from 'react'
import Link from 'next/link'

const linkStyle = {
  marginRight: 15,
  fontSize: '9px',
  textTransform: 'uppercase'
}

class Menu extends Component {
  constructor() {
    super()
  }

  getSlug(url) {
    const parts = url.split('/')
    return parts.length > 2 ? parts[parts.length - 2] : ''
  }

  render() {
    const homeLink = this.props.banners ? '' : (<Link href='/'>
      <a style={linkStyle}>Home</a>
    </Link>)
    const menuItems = this.props.menu.items.map((item) => {
      if (item.object === 'custom') {
        return (
          <Link href={item.url} key={item.ID}>
            <a style={linkStyle}>{item.title}</a>
          </Link>
        )
      }
      const slug = this.getSlug(item.url)
      const actualPage = item.object === 'category' ? 'category' : 'post'
      return (
        <Link
          as={`/${item.object}/${slug}`}
          href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          key={item.ID}
        >
          <a style={linkStyle}>{item.title}</a>
        </Link>
      )
    })

    return (
      <div>
        {homeLink}
        {menuItems}
      </div>
    )
  }
}

export default Menu
