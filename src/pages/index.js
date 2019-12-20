import React from 'react'

import Layout from '../components/layout'
import Join from '../components/join'

const MyApp = ({ location }) => (
  <Layout>
    <Join location={location} />
  </Layout>
)

export default MyApp
