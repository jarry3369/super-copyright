/**
 * @typedef {'symbol' | 'ascii' | 'text' | 'none'} notationType
 * @typedef {'all'|'some'|'none'} StatementType
 *
 * @typedef {Object} CopyrightOptions
 * @property {number} year        - Current year
 * @property {number|null} since  - Start year (renamed from start)
 * @property {string} holder      - Copyright holder
 * @property {string} separator  - Range separator
 * @property {notationType} notation
 * @property {StatementType} statement 
 */

class SuperCopyright extends HTMLElement {
  connectedCallback() {
    this.#update()
  }

  static get observedAttributes() {
    return ['since', 'holder', 'notation', 'separator', 'statement']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return
    if (!this.isConnected) return
    this.#update()
  }

  #update() {
    const options = this.#parseAttributes()
    this.textContent = this.#render(options)
  }

  /**
   * Parse and normalize element attributes
   * @returns {CopyrightOptions}
   */
  #parseAttributes() {
    const now = new Date().getFullYear()

    const sinceAttr = this.getAttribute('since')
    const since = sinceAttr ? Number(sinceAttr) : null

    /** @type {notationType} */
    const notation = this.#normalizeNotation(
      this.getAttribute('notation')
    )

    /** @type {StatementType} */
    const statement = this.#normalizeStatement(
      this.getAttribute('statement')
    )

    return {
      year: now,
      since,
      holder: this.getAttribute('holder') ?? '',
      notation,
      separator: this.getAttribute('separator') ?? '-',
      statement
    }
  }

  /**
   * Normalize notation attribute
   * @param {string|null} value
   * @returns {notationType}
   */
  #normalizeNotation(value) {
    if (value === 'none') return 'none'
    if (value === 'ascii') return 'ascii'
    if (value === 'text') return 'text'
    return 'symbol'
  }

  /**
   * Normalize statement attribute
   * @param {string|null} value
   * @returns {StatementType}
   */
  #normalizeStatement(value) {
    if (value === 'all') return 'all'
    if (value === 'some') return 'some'
    return 'none'
  }

  /**
   * Render final text
   * @param {CopyrightOptions} options
   * @returns {string}
   */
#render(options) {
  const { year, since, holder, notation, separator, statement } = options

  const notationText = this.#renderNotation(notation)
  const yearText = this.#renderYearRange(since, year, separator)
  const statementText = this.#renderStatement(statement)

  const parts = [notationText, yearText, holder].filter(Boolean)

  if (parts.length > 0) {
    parts[parts.length - 1] += '.'
  }

  if (statementText) {
    parts.push(statementText)
  }

  return parts.join(' ').trim()
}

  /**
   * Render notation text
   * @param {notationType} notation
   */
  #renderNotation(notation) {
    if (notation === 'symbol') return '©'
    if (notation === 'ascii') return '(c)'
    if (notation === 'text') return 'copyright'
    return ''
  }

  /**
   * Render statement text
   * @param {StatementType} statement
   */
  #renderStatement(statement) {
    if (statement === 'all') return 'All rights reserved.'
    if (statement === 'some') return 'Some rights reserved.'
    return ''
  }

  /**
   * Render year or year range
   * @param {number|null} since
   * @param {number} year
   * @param {string} separator
   */
  #renderYearRange(since, year, separator) {
    if (!since || since >= year) return String(year)
    return `${since}${separator}${year}`
  }
}

customElements.define('super-copyright', SuperCopyright)