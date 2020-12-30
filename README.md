## Components
### SectionFilter
```jsx
<SectionFilter/>
```
```jsx
<SectionFilter label="filter projecten" items={ filterOptions } float={false} onSelect={option => console.log(option)}/>
```

#### Props
|Propname|Value type|Required|Example syntax|Comment|
|--------|----------|--------|--------------|-------|
|label|string|yes|
|items|object|yes|{ value: 'nl', label: 'Dutch'[, checked: true] }| Value is optional, but recommended|
|float|boolean|no _(default: false)_| |Enable css float for this component|
|onSelect|function|yes||Returns the selected option in a callback function|

### SectionFilter
```jsx
<SectionHeader>[children]</SectionHeader>
```
```jsx
<SectionHeader actionLabel="ontdek ze allemaal" to="/label">cases &amp;<br/>opdrachten</SectionHeader>
```

#### Props
|Propname|Value type|Required|Example syntax|Comment|
|--------|----------|--------|--------------|-------|
|[children]|components|yes||The title of the section header|
|actionLabel|string|yes||The content that will be displayed in the anker element|
|to|string|yes|'/contact'| Sets the link for the anker element|

## Classes
### Box
The box-class applies a white border to an element.

```css
.box
```

```html
<div class="box">
    content
</div>
```

Extra support classes are available
- ```box--t``` (apply to __top__)
- ```box--b``` (apply to __bottom__)
- ```box--y``` (apply to __horizontal sides__)

- ```box--l``` (apply to __left__)
- ```box--r``` (apply to __right__)
- ```box--x``` (apply to __vertical sides__)

### Level
Sets a z-index for an element.

```css
.level--0
.level--1
/* ... */
.level--11
.level--12
```

