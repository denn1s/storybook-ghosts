import { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Button from '../../components/Button'
import GhostBadge from '../../components/GhostBadge'
import styles from './SubmitHaunting.module.css'

const hauntingTypes = ['poltergeist', 'wraith', 'friendly', 'banshee', 'demon', 'shade']

export default function SubmitHaunting() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    address: '',
    propertyName: '',
    yearBuilt: '',
    hauntingType: 'wraith',
    severity: 3,
    description: '',
    contactName: '',
    contactEmail: '',
  })

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.confirmation}>
        <p className={styles.confirmEyebrow}>Submission received</p>
        <h1 className={styles.confirmTitle}>An agent will be in touch.</h1>
        <p className={styles.confirmBody}>
          Your report has been filed under the name <em>{form.propertyName || form.address}</em>.
          A licensed representative will visit within seven business days.
          Please do not antagonize the entity in the meantime.
        </p>
        <Button variant="secondary" onClick={() => setSubmitted(false)}>
          Submit another
        </Button>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow="Disclose your property"
        title="Submit a Haunting"
        subtitle="Every disclosure is reviewed by a licensed agent. We do not judge. Most of us would buy it ourselves."
      />

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.row}>
          <Field label="Property name (optional)">
            <input
              className={styles.input}
              value={form.propertyName}
              onChange={update('propertyName')}
              placeholder="e.g. Blackthorn Cottage"
            />
          </Field>
          <Field label="Year built">
            <input
              className={styles.input}
              value={form.yearBuilt}
              onChange={update('yearBuilt')}
              placeholder="1894"
              inputMode="numeric"
            />
          </Field>
        </div>

        <Field label="Address" required>
          <input
            className={styles.input}
            value={form.address}
            onChange={update('address')}
            placeholder="13 Hollow Rd, Salem, MA"
            required
          />
        </Field>

        <Field label="Primary haunting type" required>
          <div className={styles.types}>
            {hauntingTypes.map((t) => (
              <label key={t} className={styles.typeOption}>
                <input
                  type="radio"
                  name="hauntingType"
                  value={t}
                  checked={form.hauntingType === t}
                  onChange={update('hauntingType')}
                  className={styles.radio}
                />
                <GhostBadge type={t} size="sm" />
              </label>
            ))}
          </div>
        </Field>

        <Field label={`Severity — ${form.severity} of 5 skulls`} required>
          <input
            type="range"
            min="1"
            max="5"
            value={form.severity}
            onChange={update('severity')}
            className={styles.range}
          />
        </Field>

        <Field label="Describe what you've witnessed" required>
          <textarea
            className={styles.textarea}
            value={form.description}
            onChange={update('description')}
            rows={6}
            placeholder="Be specific. Times, frequency, languages spoken. We have read everything."
            required
          />
        </Field>

        <div className={styles.row}>
          <Field label="Your name" required>
            <input
              className={styles.input}
              value={form.contactName}
              onChange={update('contactName')}
              required
            />
          </Field>
          <Field label="Email" required>
            <input
              className={styles.input}
              type="email"
              value={form.contactEmail}
              onChange={update('contactEmail')}
              required
            />
          </Field>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" type="submit">
            Submit Disclosure
          </Button>
          <Button variant="ghost" size="lg" type="button" onClick={() => setForm({
            address: '',
            propertyName: '',
            yearBuilt: '',
            hauntingType: 'wraith',
            severity: 3,
            description: '',
            contactName: '',
            contactEmail: '',
          })}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </span>
      {children}
    </label>
  )
}
