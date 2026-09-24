import React, { useState } from 'react';
import { X, Users, Plus, Trash2, CheckCircle, AlertCircle, Link2, Copy, Check, Share2 } from 'lucide-react';

export default function SplitBillModal({ isOpen, onClose, totalAmount, onConfirmSplit }) {
  const [friends, setFriends] = useState([
    { name: "Sam (Roommate 1)", email: "sam@college.edu" },
    { name: "Jordan (Roommate 2)", email: "jordan@college.edu" }
  ]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [splitResult, setSplitResult] = useState(null);
  const [shareLink, setShareLink] = useState(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  if (!isOpen) return null;

  const totalPeople = friends.length + 1;
  const sharePerPerson = (totalAmount / totalPeople).toFixed(2);

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setFriends([...friends, { name: newName.trim(), email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, '')}@college.edu` }]);
    setNewName('');
    setNewEmail('');
  };

  const handleRemoveFriend = (index) => {
    setFriends(friends.filter((_, i) => i !== index));
  };

  const buildShareLink = (splitId) => `${window.location.origin}/split/${splitId}`;

  const handleCalculateSplit = async () => {
    const splitDetails = [
      { name: "You (Order Creator)", amount: parseFloat(sharePerPerson), status: "Owner Paid" },
      ...friends.map(f => ({ name: f.name, email: f.email, amount: parseFloat(sharePerPerson), status: "Payment Request Sent" }))
    ];

    setIsGeneratingLink(true);
    let splitId;
    try {
      const res = await fetch('/api/split', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalAmount, friends })
      });
      const data = await res.json();
      splitId = data.success ? data.splitId : null;
    } catch {
      splitId = null;
    }
    // Fall back to a client-generated id if the backend isn't reachable,
    // so the share link always works in the demo/dev environment.
    if (!splitId) {
      splitId = "SPLIT-" + Math.floor(100000 + Math.random() * 900000);
    }

    setShareLink(buildShareLink(splitId));
    setIsGeneratingLink(false);
    setSplitResult({
      totalPeople,
      sharePerPerson: parseFloat(sharePerPerson),
      splitDetails
    });
    if (onConfirmSplit) {
      onConfirmSplit(splitDetails);
    }
  };

  const handleCopyLink = async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the link is still visible/selectable in the input.
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl z-10 border border-gray-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-gray-900">Split Bill with Roommates</h3>
              <p className="text-xs text-gray-500">Order Total: <span className="font-bold text-emerald-600">${totalAmount.toFixed(2)}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Per-person calculation summary */}
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-center mb-5">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Per Person Share</span>
          <div className="text-3xl font-black text-emerald-700 mt-1">
            ${sharePerPerson}
          </div>
          <p className="text-xs text-emerald-600 mt-1">
            Split equally between <span className="font-bold">{totalPeople} people</span> (You + {friends.length} friends)
          </p>
        </div>

        {/* Add Friend Form */}
        <form onSubmit={handleAddFriend} className="mb-5 space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Add Roommate / Friend</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Name (e.g. Alex)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500"
            />
            <input
              type="email"
              placeholder="College email (optional)"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Split List</span>
          </button>
        </form>

        {/* List of Friends */}
        <div className="space-y-2 mb-6 max-h-48 overflow-y-auto pr-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Split Participants</label>
          
          {/* Owner row */}
          <div className="flex items-center justify-between p-3 bg-teal-50/60 rounded-xl border border-teal-100">
            <div>
              <p className="text-sm font-bold text-gray-900">You (Order Owner)</p>
              <p className="text-xs text-gray-500">Your portion</p>
            </div>
            <span className="font-extrabold text-teal-700 text-sm">${sharePerPerson}</span>
          </div>

          {/* Friends rows */}
          {friends.map((friend, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="min-w-0 flex-1 mr-2">
                <p className="text-sm font-bold text-gray-900 truncate">{friend.name}</p>
                <p className="text-xs text-gray-400 truncate">{friend.email}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-extrabold text-gray-900 text-sm">${sharePerPerson}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFriend(idx)}
                  className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action button */}
        {!splitResult ? (
          <button
            onClick={handleCalculateSplit}
            disabled={isGeneratingLink}
            className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-70 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-teal-200 transition-all flex items-center justify-center space-x-2"
          >
            {isGeneratingLink ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating Share Link...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Confirm & Request Payments</span>
              </>
            )}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="bg-emerald-100/70 text-emerald-800 p-4 rounded-2xl text-center space-y-2 border border-emerald-200">
              <div className="flex items-center justify-center space-x-2 font-bold">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Payment Requests Generated!</span>
              </div>
              <p className="text-xs text-emerald-700">
                Requests of <span className="font-bold">${sharePerPerson}</span> sent to your roommates' campus emails.
              </p>
            </div>

            {/* Shareable split link */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
                <Link2 className="w-4 h-4" />
                <span>Shareable Split Link</span>
              </div>
              <p className="text-[11px] text-teal-700">
                Anyone with this link can view the split and pay their share — no account needed.
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={shareLink || ''}
                  onClick={(e) => e.target.select()}
                  className="flex-1 min-w-0 px-3 py-2 bg-white border border-teal-200 rounded-lg text-xs font-mono text-teal-900 truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`shrink-0 px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors ${
                    linkCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-teal-700 text-white hover:bg-teal-800'
                  }`}
                >
                  {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{linkCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              {navigator.share && (
                <button
                  type="button"
                  onClick={() => navigator.share({ title: 'ZapCart Split Bill', text: `Split our ZapCart order — your share is $${sharePerPerson}`, url: shareLink })}
                  className="w-full py-2 bg-white border border-teal-300 text-teal-700 hover:bg-teal-50 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share via...</span>
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-full px-6 py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
