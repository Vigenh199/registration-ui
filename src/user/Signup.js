import { useFormik } from 'formik';
import validator from 'validator';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';


const url = 'https://vigen-registration-api.herokuapp.com/api/users';

export default function Signup() {

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }

        if (!values.email) {
            errors.email = 'Required'
        } else if (!validator.isEmail(values.email)) {
            errors.email = 'Email is invalid'
        }

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters"
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validate,
        onSubmit: async (values) => {
            const user = {
                name: values.name,
                email: values.email,
                password: values.password
            }
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            const body = await response.json();
            
            if (body.error) {
                alert(`Error: ${body.error}`);
                console.log(body);
            } else {
                alert('Success: User created');
                console.log(body);
            }
        }
    })

    return (
        <form className="signup-form" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? <div className="error-message">{formik.errors.name}</div> : null}
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <div className="error-message">{formik.errors.email}</div> : null}
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? <div className="error-message">{formik.errors.password}</div> : null}
            </div>

            <button className="btn btn-primary" type="submit">Sign Up</button>
        </form>
    )
}