import { Shield, Users, Zap } from "lucide-react";

const FaqAndInfo = () => {
    return (
        <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600/30 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose Quantum Membership?</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto">
                            <Zap className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-white">Instant Value</h4>
                        <p className="text-gray-400 text-sm">Get 20% bonus value on every membership purchase</p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-white">Priority Access</h4>
                        <p className="text-gray-400 text-sm">Skip the queue with priority booking privileges</p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-white">Flexibility</h4>
                        <p className="text-gray-400 text-sm">Free cancellations and flexible booking options</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FaqAndInfo;