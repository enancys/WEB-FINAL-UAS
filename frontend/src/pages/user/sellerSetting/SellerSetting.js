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

const SellerSetting = () => {
    const { id } = useParams(); // ID restoran
    const [cuisines, setCuisines] = useState([]); // State untuk daftar cuisine

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        phone: '',
        website_url: '',
        opening_hours: '',
        cuisine_id: '', // Ini akan menjadi ID dari cuisine yang dipilih
        rating: '',
        description: '',
        image_url: '',
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                // Ambil data restoran
                const restaurantRes = await axios.get(`http://127.0.0.1:8000/api/restaurants/${id}`);
                setFormData((prev) => ({
                    ...prev,
                    name: restaurantRes.data.data.name,
                    location: restaurantRes.data.data.location,
                    phone: restaurantRes.data.data.phone,
                    website_url: restaurantRes.data.data.website_url,
                    opening_hours: restaurantRes.data.data.opening_hours,
                    cuisine_id: restaurantRes.data.data.cuisine_id,
                    rating: restaurantRes.data.data.rating,
                    description: restaurantRes.data.data.description,
                    image_url: restaurantRes.data.data.image_url,
                }));

                // Ambil daftar cuisine (jika ada endpoint untuk ini)
                const cuisineRes = await axios.get(`http://127.0.0.1:8000/api/cuisines`); // Sesuaikan endpoint ini
                setCuisines(cuisineRes.data.data); // Asumsikan data cuisine ada di res.data.data

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Gagal memuat data restoran atau daftar masakan. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
            await axios.put(`http://127.0.0.1:8000/api/restaurants/${id}`, formData);
            setMessage('Informasi restoran berhasil diperbarui!');
        } catch (err) {
            console.error('Error updating restaurant:', err);
            setError(
                'Gagal memperbarui informasi restoran. Pastikan semua data benar dan coba lagi.'
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
        <>
            <ComponentNavbar />
            <Container className="my-5">
                <Row className="justify-content-center pt-5">
                    <Col md={10} lg={8}> {/* Ukuran kolom diperbesar sedikit untuk mengakomodasi lebih banyak field */}
                        <Card className="shadow-lg p-4">
                            <Card.Body>
                                <h2 className="text-center mb-4">Pengaturan Restoran</h2>

                                {message && <Alert variant="success">{message}</Alert>}
                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Nama Restoran</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Masukkan nama restoran"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formLocation">
                                        <Form.Label>Lokasi</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Masukkan alamat atau lokasi"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPhone">
                                        <Form.Label>Telepon</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Masukkan nomor telepon"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formWebsiteUrl">
                                        <Form.Label>URL Website</Form.Label>
                                        <Form.Control
                                            type="url"
                                            name="website_url"
                                            value={formData.website_url}
                                            onChange={handleChange}
                                            placeholder="Masukkan URL website (opsional)"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formOpeningHours">
                                        <Form.Label>Jam Buka</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="opening_hours"
                                            value={formData.opening_hours}
                                            onChange={handleChange}
                                            placeholder="Contoh: Senin-Jumat 09:00-22:00"
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            Pisahkan dengan koma jika ada beberapa jam buka.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formCuisine">
                                        <Form.Label>Jenis Masakan</Form.Label>
                                        <Form.Select
                                            name="cuisine_id"
                                            value={formData.cuisine_id}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">-- Pilih Jenis Masakan --</option>
                                            {cuisines.map((cuisine) => (
                                                <option key={cuisine.id} value={cuisine.id}>
                                                    {cuisine.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formRating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleChange}
                                            placeholder="Masukkan rating (contoh: 4.5)"
                                            step="0.1" // Memungkinkan nilai desimal
                                            min="0"
                                            max="5"
                                        />
                                        <Form.Text className="text-muted">
                                            Skala rating 0-5.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formDescription">
                                        <Form.Label>Deskripsi</Form.Label>
                                        <Form.Control
                                            as="textarea" // Menggunakan textarea untuk deskripsi panjang
                                            rows={3}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Jelaskan tentang restoran Anda"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formImageUrl">
                                        <Form.Label>URL Gambar</Form.Label>
                                        <Form.Control
                                            type="url"
                                            name="image_url"
                                            value={formData.image_url}
                                            onChange={handleChange}
                                            placeholder="Masukkan URL gambar restoran"
                                        />
                                        <Form.Text className="text-muted">
                                            Link gambar harus bisa diakses publik.
                                        </Form.Text>
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
                                            'Simpan Perubahan Restoran'
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

export default SellerSetting;