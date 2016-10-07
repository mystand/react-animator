#React Animate

A higher-order React component for animation.

## Description

A higher-order React component which allows you to gradually change component's props values.
Аnimation is performing by the javascript (not css).

IE9+ and other modern browsers

## Api

```
animate(<Component>, <prop-names>, <duration>)
```

## Example
 
javascript:
```
import React from 'react'
import animate from 'react-animator'

const Circle = props => {
    const { top, left } = props

    return (
        <div className='circle' style={{ top, left }}/>
    )
}

const CircleAnimated = animate(Circle, ['left', 'top'], 500);

export default CircleAnimated 
```

css: 
```
.circle {
    width: 20px;
    height: 20px;
    position: absolute,
    border: 1px solid black;
}
```                           

## TODO

* remove Ramda from dependencies
* css animation for modern browsers
* non linear timing functions