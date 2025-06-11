import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert,
    Spinner,
    Card,
} from 'react-bootstrap'; // Impor komponen Bootstrap
import ComponentNavbar from '../../../components/user/ComponentNavbar';
import ComponentFooter from '../../../components/user/ComponentFooter';

const AccountSetting = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/users/${id}`);
                setFormData((prev) => ({
                    ...prev,
                    name: res.data.data.name,
                    email: res.data.data.email,
                    role: res.data.data.role,
                }));
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Gagal memuat data pengguna. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsSubmitting(true);

        try {
            await axios.put(`http://127.0.0.1:8000/api/users/${id}`, formData);
            setMessage('Akun berhasil diperbarui!');
        } catch (err) {
            console.error('Error updating account:', err);
            setError(
                'Gagal memperbarui akun. Pastikan semua data benar dan coba lagi.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Memuat data...</span>
                </Spinner>
                <p className="ms-2">Memuat data...</p>
            </Container>
        );
    }

    return (
        <> {/* Fragment untuk membungkus semua elemen */}
            <ComponentNavbar /> {/* Navbar di bagian atas */}
            <Container className="my-5">
                <Row className="justify-content-center pt-5"> {/* pt-5 untuk padding dari navbar */}
                    <Col md={8} lg={6}>
                        <Card className="shadow-lg p-4">
                            <Card.Body>
                                <h2 className="text-center mb-4">Pengaturan Akun</h2>

                                {message && <Alert variant="success">{message}</Alert>}
                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Nama</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Masukkan nama Anda"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Masukkan email Anda"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Password Baru</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Kosongkan jika tidak ingin mengubah password"
                                        />
                                        <Form.Text className="text-muted">
                                            Kosongkan kolom ini jika Anda tidak ingin mengubah password.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formRole">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">-- Pilih Role --</option>
                                            <option value="user">User</option>
                                            <option value="seller">Seller</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            'Simpan Perubahan'
                                        )}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ComponentFooter /> 
        </>
    );
};

export default AccountSetting;