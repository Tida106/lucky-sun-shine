'use client';

import React, { useState, useEffect } from 'react';

// 各月の1日にジャンプ用のID（目印）をつけるためのマッピング辞書
const MONTH_START_IDS = {
  '1月1日': 'january',
  '2月1日': 'february',
  '3月1日': 'march',
  '4月1日': 'april',
  '5月1日': 'may',
  '6月1日': 'june',
  '7月1日': 'july',
  '8月1日': 'august',
  '9月1日': 'september',
  '10月1日': 'october',
  '11月1日': 'november',
  '12月1日': 'december',
};

// 365日分の正確なデータ（日付、石名、個別slug、石言葉、フォールバック色）
const BIRTHDAY_STONES_DATA = [
  // 1月
  { date: '1月1日', stone: 'ガーネット', slug: 'garnet', meaning: '真実・友愛', color: 'bg-red-700' },
  { date: '1月2日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛の始まり', color: 'bg-pink-300' },
  { date: '1月3日', stone: 'アメジスト', slug: 'amethyst', meaning: '誠実', color: 'bg-purple-600' },
  { date: '1月4日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '1月5日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '1月6日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '安定', color: 'bg-amber-800' },
  { date: '1月7日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '1月8日', stone: 'ガーネット', slug: 'garnet', meaning: '友情', color: 'bg-red-700' },
  { date: '1月9日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清澄', color: 'bg-cyan-300' },
  { date: '1月10日', stone: 'ブルートパーズ', slug: 'blue-topaz', meaning: '知性・誠実', color: 'bg-blue-400' },
  { date: '1月11日', stone: 'サファイア', slug: 'sapphire', meaning: '品格', color: 'bg-blue-700' },
  { date: '1月12日', stone: 'アイオライト', slug: 'iolite', meaning: '信念', color: 'bg-indigo-600' },
  { date: '1月13日', stone: 'ヘマタイト', slug: 'hematite', meaning: '自信・守護', color: 'bg-zinc-700' },
  { date: '1月14日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '1月15日', stone: 'アメジスト', slug: 'amethyst', meaning: '心の平和', color: 'bg-purple-600' },
  { date: '1月16日', stone: 'ガーネット', slug: 'garnet', meaning: '持続', color: 'bg-red-700' },
  { date: '1月17日', stone: 'ターコイズ', slug: 'turquoise', meaning: '幸運・守護', color: 'bg-teal-400' },
  { date: '1月18日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },
  { date: '1月19日', stone: 'ペリドット', slug: 'peridot', meaning: '保護', color: 'bg-lime-500' },
  { date: '1月20日', stone: 'シトリン', slug: 'citrine', meaning: '繁栄', color: 'bg-yellow-400' },
  { date: '1月21日', stone: 'オニキス', slug: 'onyx', meaning: '強さ', color: 'bg-zinc-900' },
  { date: '1月22日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '純粋', color: 'bg-slate-100' },
  { date: '1月23日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '尊厳', color: 'bg-blue-800' },
  { date: '1月24日', stone: 'アベンチュリン', slug: 'aventurine', meaning: '幸運', color: 'bg-emerald-600' },
  { date: '1月25日', stone: 'ガーネット', slug: 'garnet', meaning: '忠実', color: 'bg-red-700' },
  { date: '1月26日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '落ち着き', color: 'bg-amber-800' },
  { date: '1月27日', stone: 'クリソプレーズ', slug: 'chrysoprase', meaning: '幸福', color: 'bg-emerald-400' },
  { date: '1月28日', stone: 'ルビー', slug: 'ruby', meaning: '生命力', color: 'bg-red-600' },
  { date: '1月29日', stone: 'タイガーアイ', slug: 'tigers-eye', meaning: '洞察・決断', color: 'bg-amber-700' },
  { date: '1月30日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '平和', color: 'bg-pink-300' },
  { date: '1月31日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '誠実', color: 'bg-blue-800' },

  // 2月
  { date: '2月1日', stone: 'アメジスト', slug: 'amethyst', meaning: '守護・誠実', color: 'bg-purple-600' },
  { date: '2月2日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '2月3日', stone: 'ガーネット', slug: 'garnet', meaning: '友情', color: 'bg-red-700' },
  { date: '2月4日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '直感', color: 'bg-blue-200' },
  { date: '2月5日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '2月6日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清潔・冷静', color: 'bg-cyan-300' },
  { date: '2月7日', stone: 'パール', slug: 'pearl', meaning: '純粋', color: 'bg-slate-200' },
  { date: '2月8日', stone: 'サファイア', slug: 'sapphire', meaning: '誠実', color: 'bg-blue-700' },
  { date: '2月9日', stone: 'ペリドット', slug: 'peridot', meaning: '幸運', color: 'bg-lime-500' },
  { date: '2月10日', stone: 'シトリン', slug: 'citrine', meaning: '明るさ', color: 'bg-yellow-400' },
  { date: '2月11日', stone: 'タイガーアイ', slug: 'tigers-eye', meaning: '決断力', color: 'bg-amber-700' },
  { date: '2月12日', stone: 'アメジスト', slug: 'amethyst', meaning: '平和', color: 'bg-purple-600' },
  { date: '2月13日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '2月14日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛・ロマンス', color: 'bg-pink-300' },
  { date: '2月15日', stone: 'カーネリアン', slug: 'carnelian', meaning: '行動力', color: 'bg-orange-600' },
  { date: '2月16日', stone: 'ターコイズ', slug: 'turquoise', meaning: '保護', color: 'bg-teal-400' },
  { date: '2月17日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '安定', color: 'bg-amber-800' },
  { date: '2月18日', stone: 'アメジスト', slug: 'amethyst', meaning: '誠実', color: 'bg-purple-600' },
  { date: '2月19日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清澄', color: 'bg-cyan-300' },
  { date: '2月20日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '永遠', color: 'bg-slate-100' },
  { date: '2月21日', stone: 'ガーネット', slug: 'garnet', meaning: '忠実', color: 'bg-red-700' },
  { date: '2月22日', stone: 'ヘマタイト', slug: 'hematite', meaning: '意志', color: 'bg-zinc-700' },
  { date: '2月23日', stone: 'エメラルド', slug: 'emerald', meaning: '成長', color: 'bg-emerald-600' },
  { date: '2月24日', stone: 'アメジスト', slug: 'amethyst', meaning: '心の平和', color: 'bg-purple-600' },
  { date: '2月25日', stone: 'ルビー', slug: 'ruby', meaning: '強さ', color: 'bg-red-600' },
  { date: '2月26日', stone: 'オニキス', slug: 'onyx', meaning: '守護', color: 'bg-zinc-900' },
  { date: '2月27日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '2月28日', stone: 'ターコイズ', slug: 'turquoise', meaning: '幸運', color: 'bg-teal-400' },

  // 3月
  { date: '3月1日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '勇気・知性', color: 'bg-cyan-300' },
  { date: '3月2日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '3月3日', stone: 'コーラル（珊瑚）', slug: 'coral', meaning: '幸福・長寿', color: 'bg-rose-400' },
  { date: '3月4日', stone: 'ガーネット', slug: 'garnet', meaning: '友情', color: 'bg-red-700' },
  { date: '3月5日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '直感', color: 'bg-blue-200' },
  { date: '3月6日', stone: 'サファイア', slug: 'sapphire', meaning: '誠実', color: 'bg-blue-700' },
  { date: '3月7日', stone: 'エメラルド', slug: 'emerald', meaning: '希望', color: 'bg-emerald-600' },
  { date: '3月8日', stone: 'アメジスト', slug: 'amethyst', meaning: '平和', color: 'bg-purple-600' },
  { date: '3月9日', stone: 'ブラッドストーン', slug: 'bloodstone', meaning: '勇気', color: 'bg-emerald-900' },
  { date: '3月10日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清澄', color: 'bg-cyan-300' },
  { date: '3月11日', stone: 'シトリン', slug: 'citrine', meaning: '明るさ', color: 'bg-yellow-400' },
  { date: '3月12日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '3月13日', stone: 'ターコイズ', slug: 'turquoise', meaning: '守護', color: 'bg-teal-400' },
  { date: '3月14日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '知性', color: 'bg-cyan-300' },
  { date: '3月15日', stone: 'ペリドット', slug: 'peridot', meaning: '保護', color: 'bg-lime-500' },
  { date: '3月16日', stone: 'ロードナイト', slug: 'rhodonite', meaning: '許し・愛', color: 'bg-rose-500' },
  { date: '3月17日', stone: 'クリソプレーズ', slug: 'chrysoprase', meaning: '幸運', color: 'bg-emerald-400' },
  { date: '3月18日', stone: 'フローライト', slug: 'fluorite', meaning: '集中・成長', color: 'bg-purple-400' },
  { date: '3月19日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '新生', color: 'bg-cyan-300' },
  { date: '3月20日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '純粋', color: 'bg-slate-100' },
  { date: '3月21日', stone: 'エメラルド', slug: 'emerald', meaning: '成長', color: 'bg-emerald-600' },
  { date: '3月22日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },
  { date: '3月23日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '冷静', color: 'bg-cyan-300' },
  { date: '3月24日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '3月25日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '3月26日', stone: 'ガーネット', slug: 'garnet', meaning: '持続', color: 'bg-red-700' },
  { date: '3月27日', stone: 'サファイア', slug: 'sapphire', meaning: '品格', color: 'bg-blue-700' },
  { date: '3月28日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '安定', color: 'bg-amber-800' },
  { date: '3月29日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '誠実', color: 'bg-cyan-300' },
  { date: '3月30日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '尊厳', color: 'bg-blue-800' },
  { date: '3月31日', stone: 'ブルートパーズ', slug: 'blue-topaz', meaning: '明晰', color: 'bg-blue-400' },

  // 4月
  { date: '4月1日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '純粋・永遠', color: 'bg-slate-100' },
  { date: '4月2日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '4月3日', stone: 'エメラルド', slug: 'emerald', meaning: '希望', color: 'bg-emerald-600' },
  { date: '4月4日', stone: 'サファイア', slug: 'sapphire', meaning: '誠実', color: 'bg-blue-700' },
  { date: '4月5日', stone: 'ガーネット', slug: 'garnet', meaning: '友情', color: 'bg-red-700' },
  { date: '4月6日', stone: 'アメジスト', slug: 'amethyst', meaning: '平和', color: 'bg-purple-600' },
  { date: '4月7日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '4月8日', stone: 'ターコイズ', slug: 'turquoise', meaning: '幸運', color: 'bg-teal-400' },
  { date: '4月9日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '不滅', color: 'bg-slate-100' },
  { date: '4月10日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '4月11日', stone: 'ペリドット', slug: 'peridot', meaning: '保護', color: 'bg-lime-500' },
  { date: '4月12日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清澄', color: 'bg-cyan-300' },
  { date: '4月13日', stone: 'シトリン', slug: 'citrine', meaning: '繁栄', color: 'bg-yellow-400' },
  { date: '4月14日', stone: 'タイガーアイ', slug: 'tigers-eye', meaning: '決断', color: 'bg-amber-700' },
  { date: '4月15日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '強さ', color: 'bg-slate-100' },
  { date: '4月16日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '4月17日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '優しさ', color: 'bg-pink-300' },
  { date: '4月18日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },
  { date: '4月19日', stone: 'エメラルド', slug: 'emerald', meaning: '発展', color: 'bg-emerald-600' },
  { date: '4月20日', stone: 'アベンチュリン', slug: 'aventurine', meaning: '幸運', color: 'bg-emerald-600' },
  { date: '4月21日', stone: 'ルビー', slug: 'ruby', meaning: '高潔', color: 'bg-red-600' },
  { date: '4月22日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '安定', color: 'bg-amber-800' },
  { date: '4月23日', stone: 'サファイア', slug: 'sapphire', meaning: '品格', color: 'bg-blue-700' },
  { date: '4月24日', stone: 'ガーネット', slug: 'garnet', meaning: '忠実', color: 'bg-red-700' },
  { date: '4月25日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '完璧', color: 'bg-slate-100' },
  { date: '4月26日', stone: 'アメジスト', slug: 'amethyst', meaning: '誠実', color: 'bg-purple-600' },
  { date: '4月27日', stone: 'フローライト', slug: 'fluorite', meaning: '成長', color: 'bg-purple-400' },
  { date: '4月28日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '直感', color: 'bg-blue-200' },
  { date: '4月29日', stone: 'ターコイズ', slug: 'turquoise', meaning: '守護', color: 'bg-teal-400' },
  { date: '4月30日', stone: 'エメラルド', slug: 'emerald', meaning: '成長', color: 'bg-emerald-600' },

  // 5月
  { date: '5月1日', stone: 'エメラルド', slug: 'emerald', meaning: '希望・幸福', color: 'bg-emerald-600' },
  { date: '5月2日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '5月3日', stone: 'ガーネット', slug: 'garnet', meaning: '友情', color: 'bg-red-700' },
  { date: '5月4日', stone: 'サファイア', slug: 'sapphire', meaning: '誠実', color: 'bg-blue-700' },
  { date: '5月5日', stone: 'エメラルド', slug: 'emerald', meaning: '成長', color: 'bg-emerald-600' },
  { date: '5月6日', stone: 'クリソプレーズ', slug: 'chrysoprase', meaning: '幸運', color: 'bg-emerald-400' },
  { date: '5月7日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '5月8日', stone: 'ペリドット', slug: 'peridot', meaning: '保護', color: 'bg-lime-500' },
  { date: '5月9日', stone: 'エメラルド', slug: 'emerald', meaning: '発展', color: 'bg-emerald-600' },
  { date: '5月10日', stone: 'アメジスト', slug: 'amethyst', meaning: '平和', color: 'bg-purple-600' },
  { date: '5月11日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '純粋', color: 'bg-slate-100' },
  { date: '5月12日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '5月13日', stone: 'エメラルド', slug: 'emerald', meaning: '安定', color: 'bg-emerald-600' },
  { date: '5月14日', stone: 'ターコイズ', slug: 'turquoise', meaning: '守護', color: 'bg-teal-400' },
  { date: '5月15日', stone: 'シトリン', slug: 'citrine', meaning: '繁栄', color: 'bg-yellow-400' },
  { date: '5月16日', stone: 'エメラルド', slug: 'emerald', meaning: '誠実', color: 'bg-emerald-600' },
  { date: '5月17日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清澄', color: 'bg-cyan-300' },
  { date: '5月18日', stone: 'タイガーアイ', slug: 'tigers-eye', meaning: '決断', color: 'bg-amber-700' },
  { date: '5月19日', stone: 'マラカイト', slug: 'malachite', meaning: '変容・守護', color: 'bg-emerald-800' },
  { date: '5月20日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '5月21日', stone: 'サファイア', slug: 'sapphire', meaning: '品格', color: 'bg-blue-700' },
  { date: '5月22日', stone: 'エメラルド', slug: 'emerald', meaning: '完璧', color: 'bg-emerald-600' },
  { date: '5月23日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '優しさ', color: 'bg-pink-300' },
  { date: '5月24日', stone: 'ガーネット', slug: 'garnet', meaning: '忠実', color: 'bg-red-700' },
  { date: '5月25日', stone: 'エメラルド', slug: 'emerald', meaning: '長寿', color: 'bg-emerald-600' },
  { date: '5月26日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },
  { date: '5月27日', stone: 'オニキス', slug: 'onyx', meaning: '強さ', color: 'bg-zinc-900' },
  { date: '5月28日', stone: 'エメラルド', slug: 'emerald', meaning: '守護', color: 'bg-emerald-600' },
  { date: '5月29日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '安定', color: 'bg-amber-800' },
  { date: '5月30日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '直感', color: 'bg-blue-200' },
  { date: '5月31日', stone: 'エメラルド', slug: 'emerald', meaning: '成功', color: 'bg-emerald-600' },

  // 6月
  { date: '6月1日', stone: 'パール', slug: 'pearl', meaning: '純粋・誠実', color: 'bg-slate-200' },
  { date: '6月2日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '6月3日', stone: 'アレキサンドライト', slug: 'alexandrite', meaning: '変化・適応', color: 'bg-teal-700' },
  { date: '6月4日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '6月5日', stone: 'ガーネット', slug: 'garnet', meaning: '友情', color: 'bg-red-700' },
  { date: '6月6日', stone: 'パール', slug: 'pearl', meaning: '純真', color: 'bg-slate-200' },
  { date: '6月7日', stone: 'サファイア', slug: 'sapphire', meaning: '誠実', color: 'bg-blue-700' },
  { date: '6月8日', stone: 'エメラルド', slug: 'emerald', meaning: '希望', color: 'bg-emerald-600' },
  { date: '6月9日', stone: 'パール', slug: 'pearl', meaning: '優雅', color: 'bg-slate-200' },
  { date: '6月10日', stone: 'ターコイズ', slug: 'turquoise', meaning: '守護', color: 'bg-teal-400' },
  { date: '6月11日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '直感', color: 'bg-blue-200' },
  { date: '6月12日', stone: 'アメジスト', slug: 'amethyst', meaning: '平和', color: 'bg-purple-600' },
  { date: '6月13日', stone: 'パール', slug: 'pearl', meaning: '美しさ', color: 'bg-slate-200' },
  { date: '6月14日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '6月15日', stone: 'ペリドット', slug: 'peridot', meaning: '幸運', color: 'bg-lime-500' },
  { date: '6月16日', stone: 'パール', slug: 'pearl', meaning: '成功', color: 'bg-slate-200' },
  { date: '6月17日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '6月18日', stone: 'シトリン', slug: 'citrine', meaning: '繁栄', color: 'bg-yellow-400' },
  { date: '6月19日', stone: 'パール', slug: 'pearl', meaning: '純潔', color: 'bg-slate-200' },
  { date: '6月20日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '永遠', color: 'bg-slate-100' },
  { date: '6月21日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感性', color: 'bg-blue-200' },
  { date: '6月22日', stone: 'パール', slug: 'pearl', meaning: '品格', color: 'bg-slate-200' },
  { date: '6月23日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清澄', color: 'bg-cyan-300' },
  { date: '6月24日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },
  { date: '6月25日', stone: 'パール', slug: 'pearl', meaning: '幸福', color: 'bg-slate-200' },
  { date: '6月26日', stone: 'タイガーアイ', slug: 'tigers-eye', meaning: '決断', color: 'bg-amber-700' },
  { date: '6月27日', stone: 'オパール', slug: 'opal', meaning: '希望', color: 'bg-amber-200' },
  { date: '6月28日', stone: 'パール', slug: 'pearl', meaning: '友情', color: 'bg-slate-200' },
  { date: '6月29日', stone: 'エメラルド', slug: 'emerald', meaning: '発展', color: 'bg-emerald-600' },
  { date: '6月30日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },

  // 7月
  { date: '7月1日', stone: 'ルビー', slug: 'ruby', meaning: '情熱・勝利', color: 'bg-red-600' },
  { date: '7月2日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '7月3日', stone: 'シトリン', slug: 'citrine', meaning: '繁栄', color: 'bg-yellow-400' },
  { date: '7月4日', stone: 'ガーネット', slug: 'garnet', meaning: '友情', color: 'bg-red-700' },
  { date: '7月5日', stone: 'ルビー', slug: 'ruby', meaning: '高潔', color: 'bg-red-600' },
  { date: '7月6日', stone: 'サファイア', slug: 'sapphire', meaning: '誠実', color: 'bg-blue-700' },
  { date: '7月7日', stone: 'サファイア', slug: 'sapphire', meaning: '星の加護', color: 'bg-blue-700' },
  { date: '7月8日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '7月9日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '7月10日', stone: 'アメジスト', slug: 'amethyst', meaning: '平和', color: 'bg-purple-600' },
  { date: '7月11日', stone: 'ルビー', slug: 'ruby', meaning: '強さ', color: 'bg-red-600' },
  { date: '7月12日', stone: 'ペリドット', slug: 'peridot', meaning: '保護', color: 'bg-lime-500' },
  { date: '7月13日', stone: 'ターコイズ', slug: 'turquoise', meaning: '守護', color: 'bg-teal-400' },
  { date: '7月14日', stone: 'ルビー', slug: 'ruby', meaning: '生命力', color: 'bg-red-600' },
  { date: '7月15日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },
  { date: '7月16日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '7月17日', stone: 'ルビー', slug: 'ruby', meaning: '魅力', color: 'bg-red-600' },
  { date: '7月18日', stone: 'タイガーアイ', slug: 'tigers-eye', meaning: '決断', color: 'bg-amber-700' },
  { date: '7月19日', stone: 'オニキス', slug: 'onyx', meaning: '強さ', color: 'bg-zinc-900' },
  { date: '7月20日', stone: 'ルビー', slug: 'ruby', meaning: '持続', color: 'bg-red-600' },
  { date: '7月21日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '純粋', color: 'bg-slate-100' },
  { date: '7月22日', stone: 'エメラルド', slug: 'emerald', meaning: '希望', color: 'bg-emerald-600' },
  { date: '7月23日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '7月24日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '優しさ', color: 'bg-pink-300' },
  { date: '7月25日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '安定', color: 'bg-amber-800' },
  { date: '7月26日', stone: 'ルビー', slug: 'ruby', meaning: '友愛', color: 'bg-red-600' },
  { date: '7月27日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清澄', color: 'bg-cyan-300' },
  { date: '7月28日', stone: 'シトリン', slug: 'citrine', meaning: '明るさ', color: 'bg-yellow-400' },
  { date: '7月29日', stone: 'ルビー', slug: 'ruby', meaning: '勝利', color: 'bg-red-600' },
  { date: '7月30日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '直感', color: 'bg-blue-200' },
  { date: '7月31日', stone: 'ガーネット', slug: 'garnet', meaning: '忠実', color: 'bg-red-700' },

  // 8月
  { date: '8月1日', stone: 'ペリドット', slug: 'peridot', meaning: '幸運・保護', color: 'bg-lime-500' },
  { date: '8月2日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '8月3日', stone: 'オニキス', slug: 'onyx', meaning: '強さ', color: 'bg-zinc-900' },
  { date: '8月4日', stone: 'サファイア', slug: 'sapphire', meaning: '誠実', color: 'bg-blue-700' },
  { date: '8月5日', stone: 'ペリドット', slug: 'peridot', meaning: '守護', color: 'bg-lime-500' },
  { date: '8月6日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },
  { date: '8月7日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '純粋', color: 'bg-slate-100' },
  { date: '8月8日', stone: 'ペリドット', slug: 'peridot', meaning: '成長', color: 'bg-lime-500' },
  { date: '8月9日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '8月10日', stone: 'エメラルド', slug: 'emerald', meaning: '希望', color: 'bg-emerald-600' },
  { date: '8月11日', stone: 'ペリドット', slug: 'peridot', meaning: '発展', color: 'bg-lime-500' },
  { date: '8月12日', stone: 'タイガーアイ', slug: 'tigers-eye', meaning: '決断', color: 'bg-amber-700' },
  { date: '8月13日', stone: 'アメジスト', slug: 'amethyst', meaning: '平和', color: 'bg-purple-600' },
  { date: '8月14日', stone: 'ペリドット', slug: 'peridot', meaning: '友情', color: 'bg-lime-500' },
  { date: '8月15日', stone: 'ターコイズ', slug: 'turquoise', meaning: '守護', color: 'bg-teal-400' },
  { date: '8月16日', stone: 'シトリン', slug: 'citrine', meaning: '繁栄', color: 'bg-yellow-400' },
  { date: '8月17日', stone: 'ペリドット', slug: 'peridot', meaning: '幸福', color: 'bg-lime-500' },
  { date: '8月18日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '8月19日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '8月20日', stone: 'ペリドット', slug: 'peridot', meaning: '安定', color: 'bg-lime-500' },
  { date: '8月21日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '優しさ', color: 'bg-pink-300' },
  { date: '8月22日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '落ち着き', color: 'bg-amber-800' },
  { date: '8月23日', stone: 'ペリドット', slug: 'peridot', meaning: '誠実', color: 'bg-lime-500' },
  { date: '8月24日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清澄', color: 'bg-cyan-300' },
  { date: '8月25日', stone: 'ガーネット', slug: 'garnet', meaning: '友愛', color: 'bg-red-700' },
  { date: '8月26日', stone: 'ペリドット', slug: 'peridot', meaning: '成功', color: 'bg-lime-500' },
  { date: '8月27日', stone: 'オパール', slug: 'opal', meaning: '希望', color: 'bg-amber-200' },
  { date: '8月28日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '8月29日', stone: 'ペリドット', slug: 'peridot', meaning: '持続', color: 'bg-lime-500' },
  { date: '8月30日', stone: 'サファイア', slug: 'sapphire', meaning: '品格', color: 'bg-blue-700' },
  { date: '8月31日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },

  // 9月
  { date: '9月1日', stone: 'サファイア', slug: 'sapphire', meaning: '誠実・品格', color: 'bg-blue-700' },
  { date: '9月2日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '9月3日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '9月4日', stone: 'ガーネット', slug: 'garnet', meaning: '友情', color: 'bg-red-700' },
  { date: '9月5日', stone: 'サファイア', slug: 'sapphire', meaning: '知恵', color: 'bg-blue-700' },
  { date: '9月6日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '9月7日', stone: 'アメジスト', slug: 'amethyst', meaning: '平和', color: 'bg-purple-600' },
  { date: '9月8日', stone: 'サファイア', slug: 'sapphire', meaning: '守護', color: 'bg-blue-700' },
  { date: '9月9日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '純粋', color: 'bg-slate-100' },
  { date: '9月10日', stone: 'エメラルド', slug: 'emerald', meaning: '希望', color: 'bg-emerald-600' },
  { date: '9月11日', stone: 'サファイア', slug: 'sapphire', meaning: '高潔', color: 'bg-blue-700' },
  { date: '9月12日', stone: 'シトリン', slug: 'citrine', meaning: '繁栄', color: 'bg-yellow-400' },
  { date: '9月13日', stone: 'ターコイズ', slug: 'turquoise', meaning: '幸運', color: 'bg-teal-400' },
  { date: '9月14日', stone: 'サファイア', slug: 'sapphire', meaning: '忠実', color: 'bg-blue-700' },
  { date: '9月15日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },
  { date: '9月16日', stone: 'ペリドット', slug: 'peridot', meaning: '保護', color: 'bg-lime-500' },
  { date: '9月17日', stone: 'サファイア', slug: 'sapphire', meaning: '誠実', color: 'bg-blue-700' },
  { date: '9月18日', stone: 'タイガーアイ', slug: 'tigers-eye', meaning: '決断', color: 'bg-amber-700' },
  { date: '9月19日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '安定', color: 'bg-amber-800' },
  { date: '9月20日', stone: 'サファイア', slug: 'sapphire', meaning: '品格', color: 'bg-blue-700' },
  { date: '9月21日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '優しさ', color: 'bg-pink-300' },
  { date: '9月22日', stone: 'オニキス', slug: 'onyx', meaning: '強さ', color: 'bg-zinc-900' },
  { date: '9月23日', stone: 'サファイア', slug: 'sapphire', meaning: '成功', color: 'bg-blue-700' },
  { date: '9月24日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清澄', color: 'bg-cyan-300' },
  { date: '9月25日', stone: 'ガーネット', slug: 'garnet', meaning: '忠実', color: 'bg-red-700' },
  { date: '9月26日', stone: 'サファイア', slug: 'sapphire', meaning: '知識', color: 'bg-blue-700' },
  { date: '9月27日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '9月28日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '直感', color: 'bg-blue-200' },
  { date: '9月29日', stone: 'サファイア', slug: 'sapphire', meaning: '誠意', color: 'bg-blue-700' },
  { date: '9月30日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '尊厳', color: 'bg-blue-800' },

  // 10月
  { date: '10月1日', stone: 'オパール', slug: 'opal', meaning: '希望・創造', color: 'bg-amber-200' },
  { date: '10月2日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '10月3日', stone: 'トルマリン', slug: 'tourmaline', meaning: '調和', color: 'bg-rose-400' },
  { date: '10月4日', stone: 'ガーネット', slug: 'garnet', meaning: '友情', color: 'bg-red-700' },
  { date: '10月5日', stone: 'オパール', slug: 'opal', meaning: '幸運', color: 'bg-amber-200' },
  { date: '10月6日', stone: 'サファイア', slug: 'sapphire', meaning: '誠実', color: 'bg-blue-700' },
  { date: '10月7日', stone: 'アメジスト', slug: 'amethyst', meaning: '平和', color: 'bg-purple-600' },
  { date: '10月8日', stone: 'オパール', slug: 'opal', meaning: '変化', color: 'bg-amber-200' },
  { date: '10月9日', stone: 'シトリン', slug: 'citrine', meaning: '繁栄', color: 'bg-yellow-400' },
  { date: '10月10日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '純粋', color: 'bg-slate-100' },
  { date: '10月11日', stone: 'オパール', slug: 'opal', meaning: '希望', color: 'bg-amber-200' },
  { date: '10月12日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '10月13日', stone: 'ターコイズ', slug: 'turquoise', meaning: '守護', color: 'bg-teal-400' },
  { date: '10月14日', stone: 'オパール', slug: 'opal', meaning: '多彩', color: 'bg-amber-200' },
  { date: '10月15日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },
  { date: '10月16日', stone: 'エメラルド', slug: 'emerald', meaning: '成長', color: 'bg-emerald-600' },
  { date: '10月17日', stone: 'オパール', slug: 'opal', meaning: '創造', color: 'bg-amber-200' },
  { date: '10月18日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '10月19日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '安定', color: 'bg-amber-800' },
  { date: '10月20日', stone: 'オパール', slug: 'opal', meaning: '個性', color: 'bg-amber-200' },
  { date: '10月21日', stone: 'タイガーアイ', slug: 'tigers-eye', meaning: '決断', color: 'bg-amber-700' },
  { date: '10月22日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '優しさ', color: 'bg-pink-300' },
  { date: '10月23日', stone: 'オパール', slug: 'opal', meaning: '豊かさ', color: 'bg-amber-200' },
  { date: '10月24日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清澄', color: 'bg-cyan-300' },
  { date: '10月25日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '10月26日', stone: 'オパール', slug: 'opal', meaning: '感性', color: 'bg-amber-200' },
  { date: '10月27日', stone: 'ペリドット', slug: 'peridot', meaning: '守護', color: 'bg-lime-500' },
  { date: '10月28日', stone: 'ガーネット', slug: 'garnet', meaning: '忠実', color: 'bg-red-700' },
  { date: '10月29日', stone: 'オパール', slug: 'opal', meaning: '輝き', color: 'bg-amber-200' },
  { date: '10月30日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '直感', color: 'bg-blue-200' },
  { date: '10月31日', stone: 'オニキス', slug: 'onyx', meaning: '強さ', color: 'bg-zinc-900' },

  // 11月
  { date: '11月1日', stone: 'トパーズ', slug: 'topaz', meaning: '友情・誠実', color: 'bg-amber-500' },
  { date: '11月2日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '11月3日', stone: 'シトリン', slug: 'citrine', meaning: '繁栄', color: 'bg-yellow-400' },
  { date: '11月4日', stone: 'ガーネット', slug: 'garnet', meaning: '友情', color: 'bg-red-700' },
  { date: '11月5日', stone: 'トパーズ', slug: 'topaz', meaning: '希望', color: 'bg-amber-500' },
  { date: '11月6日', stone: 'アメジスト', slug: 'amethyst', meaning: '平和', color: 'bg-purple-600' },
  { date: '11月7日', stone: 'サファイア', slug: 'sapphire', meaning: '誠実', color: 'bg-blue-700' },
  { date: '11月8日', stone: 'トパーズ', slug: 'topaz', meaning: '知性', color: 'bg-amber-500' },
  { date: '11月9日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '純粋', color: 'bg-slate-100' },
  { date: '11月10日', stone: 'エメラルド', slug: 'emerald', meaning: '成長', color: 'bg-emerald-600' },
  { date: '11月11日', stone: 'トパーズ', slug: 'topaz', meaning: '繁栄', color: 'bg-amber-500' },
  { date: '11月12日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '11月13日', stone: 'ターコイズ', slug: 'turquoise', meaning: '守護', color: 'bg-teal-400' },
  { date: '11月14日', stone: 'トパーズ', slug: 'topaz', meaning: '明るさ', color: 'bg-amber-500' },
  { date: '11月15日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },
  { date: '11月16日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '11月17日', stone: 'トパーズ', slug: 'topaz', meaning: '喜び', color: 'bg-amber-500' },
  { date: '11月18日', stone: 'タイガーアイ', slug: 'tigers-eye', meaning: '決断', color: 'bg-amber-700' },
  { date: '11月19日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '安定', color: 'bg-amber-800' },
  { date: '11月20日', stone: 'トパーズ', slug: 'topaz', meaning: '幸福', color: 'bg-amber-500' },
  { date: '11月21日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '優しさ', color: 'bg-pink-300' },
  { date: '11月22日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '11月23日', stone: 'トパーズ', slug: 'topaz', meaning: '感謝', color: 'bg-amber-500' },
  { date: '11月24日', stone: 'アクアマリン', slug: 'aquamarine', meaning: '清澄', color: 'bg-cyan-300' },
  { date: '11月25日', stone: 'ガーネット', slug: 'garnet', meaning: '忠実', color: 'bg-red-700' },
  { date: '11月26日', stone: 'トパーズ', slug: 'topaz', meaning: '自信', color: 'bg-amber-500' },
  { date: '11月27日', stone: 'オパール', slug: 'opal', meaning: '希望', color: 'bg-amber-200' },
  { date: '11月28日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '直感', color: 'bg-blue-200' },
  { date: '11月29日', stone: 'トパーズ', slug: 'topaz', meaning: '成功', color: 'bg-amber-500' },
  { date: '11月30日', stone: 'シトリン', slug: 'citrine', meaning: '明るさ', color: 'bg-yellow-400' },

  // 12月
  { date: '12月1日', stone: 'ターコイズ', slug: 'turquoise', meaning: '幸運・守護', color: 'bg-teal-400' },
  { date: '12月2日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '12月3日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '真実', color: 'bg-blue-800' },
  { date: '12月4日', stone: 'ガーネット', slug: 'garnet', meaning: '友情', color: 'bg-red-700' },
  { date: '12月5日', stone: 'ターコイズ', slug: 'turquoise', meaning: '守護', color: 'bg-teal-400' },
  { date: '12月6日', stone: 'タンザナイト', slug: 'tanzanite', meaning: '高貴・変革', color: 'bg-indigo-700' },
  { date: '12月7日', stone: 'アメジスト', slug: 'amethyst', meaning: '平和', color: 'bg-purple-600' },
  { date: '12月8日', stone: 'ターコイズ', slug: 'turquoise', meaning: '保護', color: 'bg-teal-400' },
  { date: '12月9日', stone: 'シトリン', slug: 'citrine', meaning: '繁栄', color: 'bg-yellow-400' },
  { date: '12月10日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '純粋', color: 'bg-slate-100' },
  { date: '12月11日', stone: 'ターコイズ', slug: 'turquoise', meaning: '幸福', color: 'bg-teal-400' },
  { date: '12月12日', stone: 'ムーンストーン', slug: 'moonstone', meaning: '感受性', color: 'bg-blue-200' },
  { date: '12月13日', stone: 'タンザナイト', slug: 'tanzanite', meaning: '変革', color: 'bg-indigo-700' },
  { date: '12月14日', stone: 'ターコイズ', slug: 'turquoise', meaning: '友情', color: 'bg-teal-400' },
  { date: '12月15日', stone: 'カーネリアン', slug: 'carnelian', meaning: '活力', color: 'bg-orange-600' },
  { date: '12月16日', stone: 'ラピスラズリ', slug: 'lapis-lazuli', meaning: '誠実', color: 'bg-blue-800' },
  { date: '12月17日', stone: 'ターコイズ', slug: 'turquoise', meaning: '旅の守護', color: 'bg-teal-400' },
  { date: '12月18日', stone: 'ルビー', slug: 'ruby', meaning: '情熱', color: 'bg-red-600' },
  { date: '12月19日', stone: 'スモーキークォーツ', slug: 'smoky-quartz', meaning: '安定', color: 'bg-amber-800' },
  { date: '12月20日', stone: 'ターコイズ', slug: 'turquoise', meaning: '幸運', color: 'bg-teal-400' },
  { date: '12月21日', stone: 'エメラルド', slug: 'emerald', meaning: '希望', color: 'bg-emerald-600' },
  { date: '12月22日', stone: 'タンザナイト', slug: 'tanzanite', meaning: '高貴', color: 'bg-indigo-700' },
  { date: '12月23日', stone: 'ターコイズ', slug: 'turquoise', meaning: '守護', color: 'bg-teal-400' },
  { date: '12月24日', stone: 'ローズクォーツ', slug: 'rose-quartz-meaning', meaning: '愛情', color: 'bg-pink-300' },
  { date: '12月25日', stone: 'ダイヤモンド', slug: 'diamond', meaning: '永遠', color: 'bg-slate-100' },
  { date: '12月26日', stone: 'タンザナイト', slug: 'tanzanite', meaning: '変化', color: 'bg-indigo-700' },
  { date: '12月27日', stone: 'ターコイズ', slug: 'turquoise', meaning: '保護', color: 'bg-teal-400' },
  { date: '12月28日', stone: 'ガーネット', slug: 'garnet', meaning: '忠実', color: 'bg-red-700' },
  { date: '12月29日', stone: 'アメジスト', slug: 'amethyst', meaning: '誠実', color: 'bg-purple-600' },
  { date: '12月30日', stone: 'ターコイズ', slug: 'turquoise', meaning: '新しい出発', color: 'bg-teal-400' },
  { date: '12月31日', stone: 'ガーネット', slug: 'garnet', meaning: '新年への希望', color: 'bg-red-700' },
];


// ★★★ ここからがAIの「賢い」部分：Wikipediaから自動で画像を引っ張るキャッシュ機構 ★★★
const wikiImageCache = {};
const wikiFetchPromises = {};

function useGemstoneImage(stoneName) {
  const [imageUrl, setImageUrl] = useState(wikiImageCache[stoneName] || null);

  useEffect(() => {
    // 既にキャッシュがあれば即座に返す（無駄な通信をゼロにする）
    if (wikiImageCache[stoneName]) {
      setImageUrl(wikiImageCache[stoneName]);
      return;
    }

    // まだリクエストしていなければ、Wikipedia APIへリクエストを開始
    if (!wikiFetchPromises[stoneName]) {
      let queryName = stoneName;
      
      // Wikipediaで確実に画像がヒットしやすいように正式な鉱物名・和名に変換
      const nameMap = {
        'ローズクォーツ': '紅水晶',
        'スモーキークォーツ': '煙水晶',
        'タイガーアイ': '虎目石',
        'コーラル（珊瑚）': 'サンゴ',
        'ブラッドストーン': '血玉髄',
        'アイオライト': '菫青石',
        'アメジスト': 'アメシスト', // Wikipediaの正式記事名
        'ヘマタイト': '赤鉄鉱',
        'クリソプレーズ': '緑玉髄',
        'ロードナイト': 'ばら輝石',
        'フローライト': '蛍石',
        'マラカイト': '孔雀石',
        'ブルートパーズ': 'トパーズ', 
        // --- さらにヒット率を上げるための追加分 ---
        'ムーンストーン': '月長石',
        'パール': '真珠',
        'ターコイズ': 'トルコ石',
        'カーネリアン': '紅玉髄',
        'アベンチュリン': '砂金石',
        'シトリン': '黄水晶',
      };
      queryName = nameMap[stoneName] || stoneName;

      // 完全に無料で安全なWikipediaの公開APIからサムネイルを自動取得
      const url = `https://ja.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(queryName)}&redirects=1&prop=pageimages&format=json&pithumbsize=200&origin=*`;
      
      wikiFetchPromises[stoneName] = fetch(url)
        .then(res => res.json())
        .then(data => {
          const pages = data.query.pages;
          const pageId = Object.keys(pages)[0];
          const img = pages[pageId]?.thumbnail?.source || null;
          wikiImageCache[stoneName] = img;
          return img;
        })
        .catch(err => {
          console.error('Wikipedia fetch error:', err);
          return null;
        });
    }

    // 取得完了したら画面に反映
    wikiFetchPromises[stoneName].then(img => {
      if (img) setImageUrl(img);
    });
  }, [stoneName]);

  return imageUrl;
}

// 取得した画像を表示する（もし画像がない場合は崩れずに色付きバッジになる安心設計）
const GemstoneThumbnail = ({ stone, color }) => {
  const url = useGemstoneImage(stone);

  if (url) {
    return (
      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-amber-50 border border-amber-100 shadow-inner">
        <img 
          src={url} 
          alt={stone} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
        />
      </div>
    );
  }

  // もしWikipediaに画像がない、または読み込み中の場合はこちら（レイアウト崩壊を完全に防ぐ）
  return (
    <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border border-white/40 shadow-inner overflow-hidden relative ${color || 'bg-amber-500'}`}>
      <span className="relative z-10 text-[10px] text-white font-bold drop-shadow-md">💎</span>
    </div>
  );
};


function withRakutenAffiliate(url) {
  const afb = process.env.NEXT_PUBLIC_RAKUTEN_AFB;
  if (!afb) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}scid=af_${encodeURIComponent(afb)}`;
}

export default function BirthdayTable() {
  return (
    <>
      {/* 🚀 ここから追加：収益化ページへの特急券（内部リンク） */}
      <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl shadow-sm">
        <h3 className="font-display text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
          <span aria-hidden="true">⚠️</span> せっかくの誕生石、そのままにしていませんか？
        </h3>
        <p className="text-sm text-ink-700 mb-4">
          パワーストーンは、持ち主の代わりに悪い気を吸い取ってくれます。運気を保つためには定期的な「浄化」が絶対に必要です！また、寝室の風水と組み合わせることで、石のパワーを最大限に引き出すことができます。
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <a href="/blog/sazare-ishi-guide" className="group block p-4 bg-white rounded-xl border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all">
            <div className="text-xs font-bold text-emerald-600 mb-1 tracking-wider">浄化の必須アイテム✨</div>
            <div className="font-bold text-ink-900 group-hover:text-amber-700 transition-colors">さざれ石の使い方完全ガイド →</div>
          </a>
          <a href="/blog/fengshui-bedroom-stones" className="group block p-4 bg-white rounded-xl border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all">
            <div className="text-xs font-bold text-sky-600 mb-1 tracking-wider">寝ている間に運気チャージ🌙</div>
            <div className="font-bold text-ink-900 group-hover:text-amber-700 transition-colors">寝室に置きたい石7選 →</div>
          </a>
        </div>
      </div>
      {/* 🚀 追加ここまで */}

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-amber-100 text-amber-900 border-b border-amber-200">
              <th className="p-3 font-bold whitespace-nowrap">日付</th>
              <th className="p-3 font-bold whitespace-nowrap">誕生日石</th>
              <th className="p-3 font-bold whitespace-nowrap">おすすめアクセサリー</th>
              <th className="p-3 font-bold whitespace-nowrap">石言葉</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-200">
            {BIRTHDAY_STONES_DATA.map((item, index) => {
              const searchUrl = withRakutenAffiliate(
                `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(item.stone)}+アクセサリー/`
              );
              
              // ★ AIによる魔法の追加：日付が各月の「1日」だったら、その行にジャンプ用IDを付ける！
              const rowId = MONTH_START_IDS[item.date];

              return (
                <tr key={index} id={rowId} className="hover:bg-amber-50/50 transition-colors">
                  <td className="p-3 font-medium text-ink-900 whitespace-nowrap">{item.date}</td>
                  <td className="p-3">
                    <a href={`/blog/${item.slug}/`} className="text-amber-700 hover:underline font-bold whitespace-nowrap">
                      {item.stone}
                    </a>
                  </td>
                  <td className="p-3">
                    <a
                      href={searchUrl}
                      target="_blank"
                      rel="sponsored noopener nofollow"
                      className="inline-flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-all shadow-sm group w-max"
                    >
                      <GemstoneThumbnail stone={item.stone} color={item.color} />
                      
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <span>🛍️</span>
                        <span>楽天で「{item.stone}」を探す</span>
                      </span>
                    </a>
                  </td>
                  <td className="p-3 text-ink-700 min-w-[120px]">{item.meaning}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}