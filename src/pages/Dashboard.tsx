import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Package, MapPin, CreditCard, LogOut, 
  ChevronRight, Edit2, Trash2, Plus, Check, FileText
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

type Tab = 'profile' | 'orders' | 'addresses' | 'payments';

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    logout,
    orders,
    addresses,
    paymentMethods,
    updateProfile,
    deleteAddress,
    setDefaultAddress,
    deletePaymentMethod,
    setDefaultPaymentMethod
  } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada');
    navigate('/');
  };

  const handleSaveProfile = () => {
    updateProfile(profileData);
    setIsEditing(false);
    toast.success('Perfil actualizado');
  };

  const handleDeleteAddress = (id: string) => {
    deleteAddress(id);
    toast.success('Dirección eliminada');
  };

  const handleSetDefaultAddress = (id: string) => {
    setDefaultAddress(id);
    toast.success('Dirección predeterminada actualizada');
  };

  const handleDeletePayment = (id: string) => {
    deletePaymentMethod(id);
    toast.success('Método de pago eliminado');
  };

  const handleSetDefaultPayment = (id: string) => {
    setDefaultPaymentMethod(id);
    toast.success('Método de pago predeterminado actualizado');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregado':
        return 'bg-green-100 text-green-700';
      case 'enviado':
        return 'bg-blue-100 text-blue-700';
      case 'procesando':
        return 'bg-yellow-100 text-yellow-700';
      case 'pendiente':
        return 'bg-gray-100 text-gray-700';
      case 'cancelado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const tabs = [
    { id: 'profile' as Tab, label: 'Mi Perfil', icon: User },
    { id: 'orders' as Tab, label: 'Mis Pedidos', icon: Package },
    { id: 'addresses' as Tab, label: 'Direcciones', icon: MapPin },
    { id: 'payments' as Tab, label: 'Métodos de Pago', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-[#f5f1ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-[#e8e4e0]">
                <div className="w-20 h-20 bg-[#c9a961]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-serif text-3xl text-[#c9a961]">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="font-semibold text-[#1a1a1a]">{user.name}</h2>
                <p className="text-sm text-[#6b6b6b]">{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#c9a961]/10 text-[#c9a961]'
                        : 'text-[#6b6b6b] hover:bg-[#f5f1ed]'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Cerrar Sesión</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a]">
                      Mi Perfil
                    </h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#c9a961] border border-[#c9a961] rounded hover:bg-[#c9a961] hover:text-[#1a1a1a] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#6b6b6b] mb-1">
                          Nombre completo
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) =>
                              setProfileData({ ...profileData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-[#e8e4e0] rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961]"
                          />
                        ) : (
                          <p className="text-[#1a1a1a] font-medium">{user.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6b6b6b] mb-1">
                          Correo electrónico
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) =>
                              setProfileData({ ...profileData, email: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-[#e8e4e0] rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961]"
                          />
                        ) : (
                          <p className="text-[#1a1a1a] font-medium">{user.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6b6b6b] mb-1">
                          Teléfono
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) =>
                              setProfileData({ ...profileData, phone: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-[#e8e4e0] rounded focus:outline-none focus:ring-2 focus:ring-[#c9a961]"
                            placeholder="+52 55 1234 5678"
                          />
                        ) : (
                          <p className="text-[#1a1a1a] font-medium">
                            {user.phone || 'No especificado'}
                          </p>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handleSaveProfile}
                          className="px-6 py-2 bg-[#1a1a1a] text-white font-medium rounded hover:bg-[#333] transition-colors"
                        >
                          Guardar Cambios
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setProfileData({
                              name: user.name,
                              email: user.email,
                              phone: user.phone || ''
                            });
                          }}
                          className="px-6 py-2 border border-[#e8e4e0] text-[#6b6b6b] font-medium rounded hover:border-[#1a1a1a] transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="p-6 lg:p-8">
                  <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a] mb-6">
                    Mis Pedidos
                  </h2>

                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-[#e8e4e0] mx-auto mb-4" />
                      <p className="text-[#6b6b6b]">No tienes pedidos aún</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-[#e8e4e0] rounded-lg overflow-hidden"
                        >
                          <div
                            className="p-4 bg-[#faf9f7] flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                            onClick={() =>
                              setSelectedOrder(
                                selectedOrder === order.id ? null : order.id
                              )
                            }
                          >
                            <div>
                              <p className="font-medium text-[#1a1a1a]">
                                {order.orderNumber}
                              </p>
                              <p className="text-sm text-[#6b6b6b]">
                                {new Date(order.date).toLocaleDateString('es-MX', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span
                                className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                              <span className="font-semibold text-[#1a1a1a]">
                                Q. {order.total.toLocaleString()}
                              </span>
                              <ChevronRight
                                className={`w-5 h-5 text-[#6b6b6b] transition-transform ${
                                  selectedOrder === order.id ? 'rotate-90' : ''
                                }`}
                              />
                            </div>
                          </div>

                          {selectedOrder === order.id && (
                            <div className="p-4 border-t border-[#e8e4e0]">
                              {/* Order Items */}
                              <div className="space-y-3 mb-4">
                                {order.items.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-4"
                                  >
                                    <img
                                      src={item.product.image}
                                      alt={item.product.name}
                                      className="w-16 h-16 object-cover rounded bg-[#f5f1ed]"
                                    />
                                    <div className="flex-1">
                                      <p className="font-medium text-[#1a1a1a]">
                                        {item.product.name}
                                      </p>
                                      <p className="text-sm text-[#6b6b6b]">
                                        Cantidad: {item.quantity}
                                      </p>
                                    </div>
                                    <p className="font-medium text-[#1a1a1a]">
                                      Q. {(item.product.price * item.quantity).toLocaleString()}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              {/* Order Summary */}
                              <div className="border-t border-[#e8e4e0] pt-4 space-y-2 text-sm">
                                <div className="flex justify-between text-[#6b6b6b]">
                                  <span>Subtotal</span>
                                  <span>Q. {order.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[#6b6b6b]">
                                  <span>Envío</span>
                                  <span>
                                    {order.shipping === 0
                                      ? 'Gratis'
                                      : `Q. ${order.shipping}`}
                                  </span>
                                </div>
                                <div className="flex justify-between text-[#6b6b6b]">
                                  <span>IVA</span>
                                  <span>Q. {order.tax.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-[#1a1a1a] pt-2 border-t border-[#e8e4e0]">
                                  <span>Total</span>
                                  <span>Q. {order.total.toLocaleString()}</span>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-3 mt-4 pt-4 border-t border-[#e8e4e0]">
                                <button
                                  onClick={() => toast.success('Descargando factura...')}
                                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#c9a961] border border-[#c9a961] rounded hover:bg-[#c9a961] hover:text-[#1a1a1a] transition-colors"
                                >
                                  <FileText className="w-4 h-4" />
                                  Ver Factura
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a]">
                      Direcciones de Envío
                    </h2>
                    <button
                      onClick={() => toast.info('Funcionalidad próximamente')}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1a1a1a] text-white rounded hover:bg-[#333] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Agregar
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`relative p-4 border rounded-lg ${
                          address.isDefault
                            ? 'border-[#c9a961] bg-[#c9a961]/5'
                            : 'border-[#e8e4e0]'
                        }`}
                      >
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#c9a961] text-[#1a1a1a] text-xs font-medium rounded">
                            Predeterminada
                          </span>
                        )}
                        <h4 className="font-medium text-[#1a1a1a] mb-2">
                          {address.name}
                        </h4>
                        <p className="text-sm text-[#6b6b6b]">{address.street}</p>
                        <p className="text-sm text-[#6b6b6b]">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-sm text-[#6b6b6b]">{address.country}</p>

                        <div className="flex gap-2 mt-4">
                          {!address.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="flex items-center gap-1 text-xs text-[#c9a961] hover:text-[#b8954f]"
                            >
                              <Check className="w-3 h-3" />
                              Predeterminar
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a]">
                      Métodos de Pago
                    </h2>
                    <button
                      onClick={() => toast.info('Funcionalidad próximamente')}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1a1a1a] text-white rounded hover:bg-[#333] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Agregar
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`relative p-4 border rounded-lg ${
                          method.isDefault
                            ? 'border-[#c9a961] bg-[#c9a961]/5'
                            : 'border-[#e8e4e0]'
                        }`}
                      >
                        {method.isDefault && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#c9a961] text-[#1a1a1a] text-xs font-medium rounded">
                            Predeterminada
                          </span>
                        )}
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-8 bg-[#f5f1ed] rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-[#6b6b6b] uppercase">
                              {method.type}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-[#1a1a1a]">
                              •••• •••• •••• {method.lastFour}
                            </p>
                            <p className="text-xs text-[#6b6b6b]">
                              Expira {method.expiryMonth}/{method.expiryYear}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          {!method.isDefault && (
                            <button
                              onClick={() => handleSetDefaultPayment(method.id)}
                              className="flex items-center gap-1 text-xs text-[#c9a961] hover:text-[#b8954f]"
                            >
                              <Check className="w-3 h-3" />
                              Predeterminar
                            </button>
                          )}
                          <button
                            onClick={() => handleDeletePayment(method.id)}
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
