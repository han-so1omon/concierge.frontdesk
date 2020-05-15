import React, { useState, useEffect } from 'react'
import { useTable } from 'react-table'
import RGL, { WidthProvider } from 'react-grid-layout'
import _ from 'lodash'

const ReactGridLayout = WidthProvider(RGL)

export const GridTable = (props) => {
    const [layout, setLayout] = useState()

    useEffect(() => {
        setLayout(generateLayout())
    }, [])

    /*
    useEffect(() => {
        props.onLayoutChange()
    }, [layout])
    */

    function generateDOM() {
        let colNames = props.columns
        return _.map(_.range(props.data.length), function(i) {
            let d = props.data[i]
            return (
                <div key={i} className='boxed container clearfix'>
                    {_.map(colNames, function(x) {
                        return <p key={x.accessor}>{d[x.accessor]}</p>
                        })
                    }
                </div>
            )
        })
    }

    function generateLayout() {
        return _.map(_.range(props.data.length), function(i) {
            const y = Math.ceil(Math.random() * 4) + 1
            let d = props.data[i]
            return {
                x: (i*3) % props.cols,
                y: 2,
                w: 2.5,
                h: 3,
                i: i.toString(),
                static: true,
            }
        })
    }

    function onLayoutChange(layout) {
        props.onLayoutChange(layout)
    }

    return (
        <ReactGridLayout
            layout={layout}
            onLayoutChange={onLayoutChange}
            {...props}
        >
        {generateDOM()}
        </ReactGridLayout>
    )
}


GridTable.defaultProps = {
    columns: [],
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12,//{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    margin: [25, 10],
}
