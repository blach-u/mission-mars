import { Request, Response } from 'express';
import { Astronaut } from '../database/database';

export const getAstronauts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.query;

        if (id) {
            const astronaut = await Astronaut.findOne({ where: { id: Number(id) } });
            if (astronaut) {
                return res.status(200).json({ astronaut });
            } else {
                return res.status(404).json({ error: 'Astronaut not found with the provided ID.' });
            }
        }

        const astronauts = await Astronaut.findAll();
        return res.status(200).json({ astronauts });
    } catch (err: any) {
        return res.status(500).json({ error: `Unexpected server issue {${err.message}}` });
    }
};

export const addAstronaut = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, role } = req.body;
        const count = await Astronaut.count();
        if (count >= 20) {
            return res.status(400).json({ error: 'Cannot add more than 20 rows to the Astronaut table' });
        }

        const newAstronaut = await Astronaut.create({ name, role });
        return res.status(201).json({ message: 'Astronaut added successfully!', astronaut: newAstronaut });
    } catch (err: any) {
        return res.status(500).json({ error: `Unexpected server issue {${err.message}}` });
    }
};

export const updateAstronautsById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { name, role } = req.body;

        const astronaut = await Astronaut.findOne({ where: { id: Number(id) } });
        if (!astronaut) {
            return res.status(404).json({ error: 'Astronaut not found with the provided ID.' });
        }

        astronaut.name = name;
        astronaut.role = role;
        await astronaut.save();

        return res.status(200).json({ message: 'Astronaut updated successfully!', astronaut });
    } catch (err: any) {
        return res.status(500).json({ error: `Unexpected server issue {${err.message}}` });
    }
};

export const deleteAstronautsById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }

        const deleted = await Astronaut.destroy({ where: { id: Number(id) } });

        if (deleted) {
            return res.status(200).json({ message: 'Astronaut deleted successfully!' });
        } else {
            return res.status(404).json({ error: 'Astronaut not found with the provided ID.' });
        }
    } catch (err: any) {
        return res.status(500).json({ error: `Unexpected server issue {${err.message}}` });
    }
};
