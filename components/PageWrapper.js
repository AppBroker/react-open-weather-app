import React from 'react'
import { Config } from '../config.js'
import Fonts from '../src/fonts/Fonts'

const PageWrapper = Comp => (
  class extends React.Component {
    static getSlug(url) {
      const parts = url.split('/')
      return parts.length > 2 ? parts[parts.length - 2] : ''
    }

    static async getInitialProps(args) {
      const headerMenuRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`
      )
      const headerMenu = await headerMenuRes.json()

      const footerMenuRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/footer-menu`
      )
      const footerMenu = await footerMenuRes.json()

      return {
        headerMenu,
        footerMenu,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
      }
    }

    static async processBanners(array) {
      const promises = array.map(this.getBannerItem)
      return await Promise.all(promises).then((res)=>{
        return res
      })
    }

    static async getBannerItem(item) {
      const bannerItem = await fetch(
        item
      )
      const bannerItemRes = await bannerItem.json()
      return bannerItemRes[0]
    }

    componentDidMount() {
      Fonts()
    }

    render() {
      return (
        <Comp {...this.props} />
      )
    }
  }
)

export default PageWrapper
