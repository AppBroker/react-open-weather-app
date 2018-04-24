import Link from 'next/link'

const hrStyle = {
  marginTop: 10
}

const paddingLeftRigt = {
  paddingLeft: 15,
  paddingRight: 15,
}

const Footer = () => (
  <div style={paddingLeftRigt}>
    <hr style={hrStyle} />
    <p>
            ✈️{' '}
      <Link href='http://www.appbroker.biz'>
        <a>Made by AppBroker</a>
      </Link>. ™{' '}
    </p>
    <p>
            ® All rights reserved.
    </p>
  </div>
)

export default Footer
