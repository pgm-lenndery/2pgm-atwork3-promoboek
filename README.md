## Components
### Section
```jsx
<Section>[children]</Section>
```
```jsx
<Section spacing="b"><p>Hello world!</p></Section>
```
#### Props
|Propname|Value type|Required|Example syntax|Comment|
|--------|----------|--------|--------------|-------|
|[children]|components|false||The components that require spacing|
|spacing|string|yes|top, bottom, left, right, t, b, l, r, x, y|The place where spacing will be applied|

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

### SectionHeader
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
|to|string|yes|'/contact'|Sets the link for the anker element|

### Anker
A component for navigating the app, using React Router. Only for internal routes.

```jsx
<Anker />
```

```jsx
<Anker title="Contact us" href="/contact"/>
```

#### Props
|Propname|Value type|Required|Example syntax|Comment|
|--------|----------|--------|--------------|-------|
|title|string, number|yes||The label for the button
|href|string|yes|'/contact'|Sets the link for the anker element, always start with a '/'

### Form
Uses react-form-hook

```jsx
<Form>[children]</Form>
```
```jsx
<Form onClick={values => console.log(values)}>
    [children]
</Form>
```

#### Props
|Propname|Value type|Required|Example syntax|Comment|
|--------|----------|--------|--------------|-------|
|onClick|function|yes||The callbackfunction that returns all values from the form
|[children]|components|yes||The Field-components

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

