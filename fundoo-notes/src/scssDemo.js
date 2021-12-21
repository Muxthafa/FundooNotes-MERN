import './demo.scss'

import React from 'react'

export default function scssDemo() {
    return (
        <div>
            <h1 className="header">Hello</h1>

            <div className="mix">
                <p>This is mixin example</p>
            </div>

            <div className="mix2">
                <p>One more mixin</p>
            </div>

            <div className="nested">
                <p>Nested example</p>
            </div>

        </div>
    )
}
