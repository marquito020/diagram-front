import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useDiagramFetch } from "../../hooks/useDiagramFetch";
import { PrivateRoutes } from "../../../../app/constants/routes";
import { FaEye, FaTrashAlt, FaEdit } from "react-icons/fa"; // Iconos modernos

// Estilos para el modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

Modal.setAppElement("#root"); // Establece el elemento de la app para accesibilidad

export default function ListDiagrams() {
  const { diagrams, deleteDiagram } = useDiagramFetch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiagramId, setSelectedDiagramId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setSelectedDiagramId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDiagramId(null);
  };

  const confirmDelete = () => {
    if (selectedDiagramId) {
      deleteDiagram(selectedDiagramId);
    }
    closeModal();
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow-lg overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-800 to-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Anfitrión
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Participantes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Acción
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {diagrams.map((diagram) => (
                    <tr
                      key={diagram._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {diagram.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {diagram.anfitrion.firstName} {diagram.anfitrion.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {diagram.participantes
                          ?.map((participante) => `${participante.firstName} ${participante.lastName}`)
                          .join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-4">
                          <Link
                            to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.WORK.replace(":_id", diagram._id)}`}
                            className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors duration-200"
                          >
                            <FaEye className="w-5 h-5" />
                            <span>Ver</span>
                          </Link>

                          <button
                            onClick={() => openModal(diagram._id)}
                            className="text-red-600 hover:text-red-800 flex items-center space-x-1 transition-colors duration-200"
                          >
                            <FaTrashAlt className="w-5 h-5" />
                            <span>Eliminar</span>
                          </button>

                          <Link
                            to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.EDIT.replace(":_id", diagram._id)}`}
                            className="text-green-600 hover:text-green-800 flex items-center space-x-1 transition-colors duration-200"
                          >
                            <FaEdit className="w-5 h-5" />
                            <span>Editar</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal para confirmar eliminación */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Confirmar eliminación"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Confirmar eliminación</h2>
              <p className="text-gray-600 mb-6">¿Estás seguro de que quieres eliminar este diagrama?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Eliminar
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}