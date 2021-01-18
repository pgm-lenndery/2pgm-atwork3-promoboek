import React, { useRef } from 'react';

import { Container } from '..';
import './index.scss';

export default ({ label: componentLabel = 'label unset', float = false, items, config: { label = 'label', value = 'value'} = {}, onSelect, defaultChecked = null, spacing = false }) => {
    if (!items)  throw new Error('items was not set for a SectionFilter component');
    if (!onSelect)  throw new Error('onSelect was not set for a SectionFilter component');
    
    /**
     * TODO: defaultChecked
     */
    
    const group = useRef();
    
    const handleClick = (e, value) => {
        const $currentChecked = group.current.querySelector('button.checked');
        const $newValue = e.target.closest('button');
        
        $currentChecked && $currentChecked.classList.remove('checked');
        $newValue.classList.add('checked');
        
        onSelect(value)
    }
    
    return (
        <div className={`sectionFilter__wrapper box ${ (spacing && 'sectionFilter--spacing') }`}>
            <Container theme="section-filter" className={`sectionFilter ${ (float && 'sectionFilter--float')}`} fluid>
                    <div className="sectionFilter__label">{ componentLabel }</div>
                    <div className="sectionFilter__options" ref={group}>{
                        items.map((i, index) => {
                            if (i[value] == null && !i[label]) throw new Error('One or more options in a SectionFilter have a value null, but no label')
                            
                            return <button key={index} className={`sectionFilter__option option btn ${i.checked && 'checked'}`} onClick={(e) => handleClick(e, i[value] || i[label])}>
                                <div className="option__label">{ i[label] || i[value] }</div>
                                <div className="option__separator">・</div>
                            </button>
                        })
                    }</div>
            </Container>
        </div>
    )
}

// float ? true : false